import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = path.resolve('_build/html');
const cases = [
  { id: 'AL00.1', title: 'AL00.1 — Τι είναι η Τεχνητή Νοημοσύνη;', image: 'AL00_fig01_ai_system' },
  { id: 'AL00.2', title: 'AL00.2 — AI, ML, DL και Παραγωγική ΤΝ', image: 'AL00_fig02_ai_ml_dl_genai' },
  { id: 'AL00.3', title: 'AL00.3 — Πώς εκπαιδεύεται και αξιολογείται ένα μοντέλο;', image: 'AL00_fig03_training_cycle' },
  { id: 'AL00.4', title: 'AL00.4 — Πώς λειτουργεί ένα μεγάλο γλωσσικό μοντέλο;', image: 'AL00_fig04_llm_flow' },
  { id: 'AL00.8', title: 'AL00.8 — Η ΤΝ ως υποστήριξη της μάθησης', image: 'AL00_fig05_learning_loop' },
];
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

async function htmlFiles(directory) {
  const result = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await htmlFiles(full));
    else if (entry.name.endsWith('.html')) result.push(full);
  }
  return result;
}

function contentType(file) {
  if (file.endsWith('.html')) return 'text/html; charset=utf-8';
  if (file.endsWith('.png')) return 'image/png';
  if (file.endsWith('.css')) return 'text/css; charset=utf-8';
  if (file.endsWith('.js')) return 'text/javascript; charset=utf-8';
  return 'application/octet-stream';
}

const pages = await htmlFiles(root);
const pageContents = new Map();
for (const file of pages) pageContents.set(file, await fs.readFile(file, 'utf8'));

const server = http.createServer(async (request, response) => {
  const requested = decodeURIComponent((request.url || '/').split('?')[0]);
  const relative = requested.replace(/^\/+/, '') || 'index.html';
  const file = path.resolve(root, relative);
  if (!file.startsWith(root) || !(await fs.stat(file).catch(() => null))) {
    response.writeHead(404); response.end('Not found'); return;
  }
  response.writeHead(200, { 'Content-Type': contentType(file) });
  response.end(await fs.readFile(file));
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const port = server.address().port;
await fs.mkdir('screenshots', { recursive: true });

const browser = await chromium.launch({ headless: true });
const measurements = [];
try {
  for (const test of cases) {
    const pageFile = [...pageContents.entries()].find(([, html]) => html.includes(test.title))?.[0];
    if (!pageFile) throw new Error(`Page not found for ${test.id}`);
    const pageUrl = `http://127.0.0.1:${port}/${path.relative(root, pageFile).replaceAll(path.sep, '/')}`;
    for (const viewport of viewports) {
      const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
      await page.goto(pageUrl, { waitUntil: 'networkidle' });
      const image = page.locator(`img[src*="${test.image}"]`).first();
      if (await image.count() === 0) throw new Error(`${test.id}: image source not found`);
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(img => img.complete ? undefined : new Promise((resolve, reject) => { img.addEventListener('load', resolve, { once: true }); img.addEventListener('error', reject, { once: true }); }));
      const result = await image.evaluate(img => {
        const article = img.closest('article') || img.closest('main') || img.parentElement;
        const imageBox = img.getBoundingClientRect();
        const contentBox = article.getBoundingClientRect();
        const style = getComputedStyle(img);
        return {
          src: img.getAttribute('src'),
          alt: img.getAttribute('alt') || '',
          imageWidth: imageBox.width,
          imageHeight: imageBox.height,
          contentWidth: contentBox.width,
          ratio: imageBox.width / contentBox.width,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          display: style.display,
          objectFit: style.objectFit,
          horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
        };
      });
      if (!result.alt.trim()) throw new Error(`${test.id} ${viewport.name}: empty alt text`);
      if (result.ratio < 0.8) throw new Error(`${test.id} ${viewport.name}: width ratio ${result.ratio.toFixed(3)} < 0.8`);
      if (result.horizontalOverflow) throw new Error(`${test.id} ${viewport.name}: horizontal overflow`);
      measurements.push({ ...test, viewport, page: path.relative(root, pageFile), ...result });
      await page.screenshot({ path: `screenshots/${test.id.replace('.', '-')}-${viewport.name}.png`, fullPage: false });
      await page.close();
    }
  }
} finally {
  await browser.close();
  server.close();
}

await fs.writeFile('measurements.json', JSON.stringify(measurements, null, 2));
const lines = ['# AL00 figure rendering measurements', '', '| Figure | Viewport | Image px | Content px | Ratio | Overflow |', '|---|---|---:|---:|---:|---|'];
for (const row of measurements) lines.push(`| ${row.id} | ${row.viewport.name} | ${row.imageWidth.toFixed(1)} | ${row.contentWidth.toFixed(1)} | ${(row.ratio * 100).toFixed(1)}% | ${row.horizontalOverflow ? 'yes' : 'no'} |`);
await fs.writeFile('measurements.md', `${lines.join('\n')}\n`);
console.log(JSON.stringify(measurements, null, 2));
