import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { chromium } from 'playwright';

const root = path.resolve('_build/html');
const baseUrl = '/geoskills';
const cases = [
  { id: 'AL00.1', slug: 'ai-introduction', image: 'AL00_fig01_ai_system' },
  { id: 'AL00.2', slug: 'ai-ml-dl-generative', image: 'AL00_fig02_ai_ml_dl_genai' },
  { id: 'AL00.3', slug: 'model-training', image: 'AL00_fig03_training_cycle' },
  { id: 'AL00.4', slug: 'language-models', image: 'AL00_fig04_llm_flow' },
  { id: 'AL00.8', slug: 'ai-for-learning', image: 'AL00_fig05_learning_loop' },
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

function fail(message) {
  const text = String(message).replace(/\s+/g, ' ').trim();
  console.error(text);
  console.log(`::error title=AL00 figure rendering QA::${text}`);
  throw new Error(text);
}

const server = http.createServer(async (request, response) => {
  let requested = decodeURIComponent((request.url || '/').split('?')[0]);
  if (requested === baseUrl) requested = `${baseUrl}/`;
  if (requested.startsWith(`${baseUrl}/`)) requested = requested.slice(baseUrl.length);
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
    const expected = path.join(root, 'courses', 'ai-learning', 'al00', test.slug, 'index.html');
    const pageFile = pageContents.has(expected)
      ? expected
      : [...pageContents.entries()].find(([, html]) => html.includes(test.slug))?.[0];
    if (!pageFile) fail(`${test.id}: page not found; expected=${expected}`);
    const pageUrl = `http://127.0.0.1:${port}${baseUrl}/${path.relative(root, pageFile).replaceAll(path.sep, '/')}`;
    for (const viewport of viewports) {
      const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
      page.on('console', message => console.log(`[${test.id} ${viewport.name}] browser ${message.type()}: ${message.text()}`));
      page.on('pageerror', error => console.log(`[${test.id} ${viewport.name}] pageerror: ${error.message}`));
      await page.goto(pageUrl, { waitUntil: 'networkidle' });
      const image = page.locator(`img[src*="${test.image}"]`).first();
      if (await image.count() === 0) {
        const candidates = await page.locator('img').evaluateAll((images) => images.map(img => ({ src: img.getAttribute('src'), alt: img.getAttribute('alt') })));
        fail(`${test.id}: image source not found; candidates=${JSON.stringify(candidates)}`);
      }
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
      if (!result.alt.trim()) fail(`${test.id} ${viewport.name}: empty alt text`);
      if (result.naturalWidth === 0) fail(`${test.id} ${viewport.name}: image failed to load src=${result.src}`);
      if (result.ratio < 0.8) fail(`${test.id} ${viewport.name}: width ratio ${result.ratio.toFixed(3)} < 0.8; image=${result.imageWidth}; content=${result.contentWidth}`);
      if (result.horizontalOverflow) fail(`${test.id} ${viewport.name}: horizontal overflow; image=${result.imageWidth}; viewport=${viewport.width}`);
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
