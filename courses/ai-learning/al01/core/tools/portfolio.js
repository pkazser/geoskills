'use strict';

const empty = () => ({
  schemaVersion: 1,
  assignment: { prompt: '', requirements: '', topic: '', question: '', plan: '', pending: '' },
  literature: { searches: [], sources: [] },
  history: [],
  readingCards: []
});

const sourceFields = ['title', 'authors', 'year', 'url', 'relevance', 'pending', 'verifiedAt'];
const cardFields = [
  ['readingExtent', 'Έκταση ανάγνωσης'],
  ['purpose', 'Σκοπός'],
  ['approach', 'Προσέγγιση'],
  ['finding', 'Βασικό εύρημα'],
  ['evidenceLocation', 'Ακριβές σημείο τεκμηρίωσης'],
  ['limitation', 'Περιορισμός'],
  ['usefulness', 'Χρησιμότητα για την εργασία'],
  ['pending', 'Εκκρεμότητα']
];

let data = empty();
let dirty = false;
const $ = id => document.getElementById(id);

function safeText(value) {
  return typeof value === 'string' ? value : '';
}

function sourceId(source) {
  if (typeof source.sourceId === 'string' && source.sourceId.trim()) return source.sourceId;
  const key = sourceFields.map(field => safeText(source[field]).trim().toLowerCase()).join('|');
  let hash = 2166136261;
  for (const char of key) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return 'source-' + (hash >>> 0).toString(16).padStart(8, '0');
}

function normalize(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw Error('Μη υποστηριζόμενη μορφή αρχείου.');
  if (input.schemaVersion !== 1) throw Error('Μη υποστηριζόμενη έκδοση portfolio.');
  const output = JSON.parse(JSON.stringify(input));
  output.assignment = output.assignment && typeof output.assignment === 'object' ? output.assignment : {};
  output.literature = output.literature && typeof output.literature === 'object' ? output.literature : {};
  output.literature.searches = Array.isArray(output.literature.searches) ? output.literature.searches : [];
  output.literature.sources = Array.isArray(output.literature.sources) ? output.literature.sources : [];
  output.history = Array.isArray(output.history) ? output.history : [];
  output.readingCards = Array.isArray(output.readingCards) ? output.readingCards : [];

  for (const field of ['prompt', 'requirements', 'topic', 'question', 'plan', 'pending']) {
    if (typeof output.assignment[field] !== 'string') output.assignment[field] = '';
  }
  output.literature.sources = output.literature.sources.map(source => {
    const normalized = source && typeof source === 'object' ? source : {};
    for (const field of sourceFields) if (typeof normalized[field] !== 'string') normalized[field] = '';
    normalized.sourceId = sourceId(normalized);
    return normalized;
  });
  output.readingCards = output.readingCards.map(card => {
    const normalized = card && typeof card === 'object' ? card : {};
    for (const pair of cardFields) if (typeof normalized[pair[0]] !== 'string') normalized[pair[0]] = '';
    if (typeof normalized.sourceId !== 'string') normalized.sourceId = '';
    return normalized;
  });
  return output;
}

function validate(value) {
  const normalized = normalize(value);
  for (const item of normalized.literature.searches) {
    if (!item || typeof item !== 'object') throw Error('Μη έγκυρη αναζήτηση.');
    for (const field of ['date', 'service', 'terms', 'observation']) {
      if (typeof item[field] !== 'string') throw Error('Μη έγκυρο πεδίο αναζήτησης: ' + field);
    }
  }
  for (const source of normalized.literature.sources) {
    for (const field of sourceFields) if (typeof source[field] !== 'string') throw Error('Μη έγκυρο πεδίο πηγής: ' + field);
  }
  for (const card of normalized.readingCards) {
    for (const pair of cardFields) if (typeof card[pair[0]] !== 'string') throw Error('Μη έγκυρο πεδίο καρτέλας: ' + pair[0]);
  }
  for (const item of normalized.history) {
    if (!item || typeof item !== 'object') throw Error('Μη έγκυρο ιστορικό.');
    for (const field of ['previousQuestion', 'newQuestion', 'reason']) {
      if (typeof item[field] !== 'string') throw Error('Μη έγκυρο πεδίο ιστορικού: ' + field);
    }
  }
  return normalized;
}

function msg(text) { $('status').textContent = text; }

function update() {
  for (const element of document.querySelectorAll('[data-section]')) {
    const section = element.dataset.section;
    const key = element.dataset.key;
    const index = element.dataset.index;
    if (index !== undefined && index !== '') {
      if (data[section][element.dataset.list] && data[section][element.dataset.list][+index]) {
        data[section][element.dataset.list][+index][key] = element.value;
      }
    } else {
      data[section][key] = element.value;
    }
  }
  dirty = true;
  msg('Υπάρχουν αλλαγές που δεν έχουν αποθηκευτεί.');
}

function download(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

function save() {
  update();
  data = validate(data);
  download(JSON.stringify(data, null, 2), 'geoskills-al01-portfolio.json', 'application/json;charset=utf-8');
  dirty = false;
  msg('Το αρχείο δόθηκε στον φυλλομετρητή για λήψη. Έλεγξε ότι αποθηκεύτηκε.');
}

function exportTxt() {
  update();
  data = validate(data);
  const cards = data.readingCards.map((card, index) => {
    const source = data.literature.sources.find(item => item.sourceId === card.sourceId);
    return (index + 1) + '. Πηγή: ' + (source?.title || card.sourceId || 'Δεν επιλέχθηκε') + '\n' +
      cardFields.map(pair => pair[1] + ': ' + card[pair[0]]).join('\n');
  }).join('\n\n');
  const text = 'GEOSKILLS AL01 PORTFOLIO\n' +
    'Εκφώνηση: ' + data.assignment.prompt + '\n' +
    'Απαιτήσεις: ' + data.assignment.requirements + '\n' +
    'Θέμα: ' + data.assignment.topic + '\n' +
    'Ερώτημα: ' + data.assignment.question + '\n' +
    'Βήματα: ' + data.assignment.plan + '\n' +
    'Εκκρεμότητες: ' + data.assignment.pending + '\n\n' +
    'ΚΑΡΤΕΛΕΣ ΑΝΑΓΝΩΣΗΣ\n' + cards + '\n\n' +
    'ΙΣΤΟΡΙΚΟ\n' + data.history.map(item => item.previousQuestion + ' -> ' + item.newQuestion + ': ' + item.reason).join('\n');
  download(text, 'geoskills-al01-portfolio.txt', 'text/plain;charset=utf-8');
  msg('Το αρχείο κειμένου δόθηκε για λήψη.');
}

function importFile(file) {
  if (!file) return;
  if (dirty && !confirm('Υπάρχουν μη αποθηκευμένες αλλαγές. Θέλεις να τις αντικαταστήσεις;')) return;
  if (file.size > 1024 * 1024) {
    msg('Το αρχείο είναι υπερβολικά μεγάλο (όριο 1 MB).');
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    try {
      data = validate(JSON.parse(reader.result));
      dirty = false;
      render();
      msg('Το αρχείο φορτώθηκε επιτυχώς.');
    } catch (error) {
      msg('Η φόρτωση απέτυχε: ' + error.message);
    }
  };
  reader.onerror = () => msg('Δεν ήταν δυνατή η ανάγνωση του αρχείου.');
  reader.readAsText(file, 'utf-8');
}

function field(section, key, label, value = '', list = '', index = '') {
  const wrap = document.createElement('div');
  const id = 'f-' + section + '-' + key + '-' + index + '-' + list;
  const labelElement = document.createElement('label');
  labelElement.htmlFor = id;
  labelElement.textContent = label;
  const element = document.createElement(['date', 'year', 'url'].includes(key) ? 'input' : 'textarea');
  element.id = id;
  element.value = value;
  element.dataset.section = section;
  element.dataset.key = key;
  if (list) {
    element.dataset.list = list;
    element.dataset.index = index;
  }
  element.addEventListener('input', update);
  wrap.append(labelElement, element);
  return wrap;
}

function readingSelect(card, index) {
  const wrap = document.createElement('div');
  const id = 'reading-source-' + index;
  const label = document.createElement('label');
  label.htmlFor = id;
  label.textContent = 'Πηγή';
  const select = document.createElement('select');
  select.id = id;
  select.dataset.section = 'readingCards';
  select.dataset.key = 'sourceId';
  select.dataset.index = index;
  select.dataset.list = 'readingCards';
  select.append(new Option('Επίλεξε καταχωρισμένη πηγή', ''));
  data.literature.sources.forEach(source => {
    select.append(new Option((source.title || 'Χωρίς τίτλο') + ' — ' + source.sourceId, source.sourceId));
  });
  select.value = card.sourceId;
  select.addEventListener('change', update);
  wrap.append(label, select);
  return wrap;
}

function render() {
  const assignment = $('assignment');
  if (assignment) {
    assignment.replaceChildren();
    for (const pair of Object.entries({
      prompt: 'Αρχική εκφώνηση',
      requirements: 'Υποχρεωτικές απαιτήσεις',
      topic: 'Επιλεγμένο θέμα',
      question: 'Ερευνητικό ερώτημα',
      plan: 'Σχέδιο 4–6 βημάτων',
      pending: 'Εκκρεμότητες'
    })) assignment.append(field('assignment', pair[0], pair[1], data.assignment[pair[0]]));
  }

  const searches = $('searches');
  const sources = $('sources');
  if (searches && sources) {
    searches.replaceChildren();
    sources.replaceChildren();
    data.literature.searches.forEach((value, index) => {
      const set = document.createElement('fieldset');
      set.innerHTML = '<legend>Αναζήτηση ' + (index + 1) + '</legend>';
      for (const pair of Object.entries({
        date: 'Ημερομηνία (YYYY-MM-DD)',
        service: 'Υπηρεσία',
        terms: 'Ακριβείς όροι',
        observation: 'Παρατήρηση'
      })) set.append(field('literature', pair[0], pair[1], value[pair[0]], 'searches', index));
      searches.append(set);
    });
    data.literature.sources.forEach((value, index) => {
      const set = document.createElement('fieldset');
      set.innerHTML = '<legend>Πηγή ' + (index + 1) + '</legend>';
      for (const pair of Object.entries({
        title: 'Τίτλος',
        authors: 'Συγγραφείς',
        year: 'Έτος',
        url: 'DOI ή επίσημο URL',
        relevance: 'Αρχική συνάφεια',
        pending: 'Τι απομένει να ελέγξω',
        verifiedAt: 'Πού επαλήθευσα τα στοιχεία'
      })) set.append(field('literature', pair[0], pair[1], value[pair[0]], 'sources', index));
      sources.append(set);
    });
  }

  const cards = $('readingCards');
  if (cards) {
    cards.replaceChildren();
    data.readingCards.forEach((value, index) => {
      const set = document.createElement('fieldset');
      set.innerHTML = '<legend>Καρτέλα ανάγνωσης ' + (index + 1) + '</legend>';
      set.append(readingSelect(value, index));
      for (const pair of cardFields) {
        const key = pair[0];
        const label = pair[1];
        if (key === 'readingExtent') {
          const wrap = document.createElement('div');
          const id = 'reading-' + key + '-' + index;
          const labelElement = document.createElement('label');
          labelElement.htmlFor = id;
          labelElement.textContent = label;
          const select = document.createElement('select');
          select.id = id;
          select.dataset.section = 'readingCards';
          select.dataset.key = key;
          select.dataset.list = 'readingCards';
          select.dataset.index = index;
          [['', 'Επίλεξε έκταση'], ['summary', 'Περίληψη'], ['partial', 'Μερικό κείμενο'], ['full', 'Πλήρες κείμενο']]
            .forEach(option => select.append(new Option(option[1], option[0])));
          select.value = value[key];
          select.addEventListener('change', update);
          wrap.append(labelElement, select);
          set.append(wrap);
        } else {
          set.append(field('readingCards', key, label, value[key], 'readingCards', index));
        }
      }
      cards.append(set);
    });
  }
}

window.addEventListener('beforeunload', event => {
  if (dirty) {
    event.preventDefault();
    event.returnValue = '';
  }
});

window.addEventListener('DOMContentLoaded', () => {
  $('save')?.addEventListener('click', save);
  $('txt')?.addEventListener('click', exportTxt);
  $('load')?.addEventListener('change', event => {
    importFile(event.target.files[0]);
    event.target.value = '';
  });
  $('addSearch')?.addEventListener('click', () => {
    update();
    data.literature.searches.push({ date: '', service: '', terms: '', observation: '' });
    render();
    msg('Προστέθηκε αναζήτηση. Μην ξεχάσεις να αποθηκεύσεις.');
  });
  $('addSource')?.addEventListener('click', () => {
    update();
    data.literature.sources.push({ sourceId: '', title: '', authors: '', year: '', url: '', relevance: '', pending: '', verifiedAt: '' });
    data = validate(data);
    render();
    msg('Προστέθηκε πηγή. Μην ξεχάσεις να αποθηκεύσεις.');
  });
  $('addReadingCard')?.addEventListener('click', () => {
    update();
    data.readingCards.push({
      sourceId: data.literature.sources[0]?.sourceId || '',
      readingExtent: '',
      purpose: '',
      approach: '',
      finding: '',
      evidenceLocation: '',
      limitation: '',
      usefulness: '',
      pending: ''
    });
    render();
    msg('Προστέθηκε καρτέλα ανάγνωσης. Μην ξεχάσεις να αποθηκεύσεις.');
  });
  $('revise')?.addEventListener('click', () => {
    update();
    const question = $('newQuestion').value.trim();
    const reason = $('reason').value.trim();
    if (!question || !reason || !data.assignment.question.trim()) {
      msg('Χρειάζεται αρχικό και νέο ερώτημα και αιτιολόγηση.');
      return;
    }
    data.history.push({ previousQuestion: data.assignment.question, newQuestion: question, reason });
    data.assignment.question = question;
    render();
    $('newQuestion').value = '';
    $('reason').value = '';
    msg('Το ερώτημα αναθεωρήθηκε. Το αρχικό διατηρείται στο ιστορικό. Αποθήκευσε το αρχείο.');
  });
  render();
});
