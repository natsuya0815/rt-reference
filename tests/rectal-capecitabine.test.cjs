const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const read = p => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const d = JSON.parse(read('data.json'));
const n = JSON.parse(read('clinical_notes.json'));
const ev = JSON.parse(read('evidence.json'));
const parseJS = (file, variable) => {
  const prefix = 'window.' + variable + ' = ';
  const value = read(file);
  assert.ok(value.startsWith(prefix));
  return JSON.parse(value.slice(prefix.length).trim().replace(/;$/, ''));
};
test('JSON and JS are synced', () => {
  assert.deepEqual(parseJS('data.js', 'RT_SEED'), d);
  assert.deepEqual(parseJS('evidence.js', 'RT_EVIDENCE'), ev);
  assert.deepEqual(n.clinicalNotes, d.clinicalNotes);
  assert.equal(n.count, n.clinicalNotes.length);
});
test('D method content, sources and SIB exist', () => {
  const article = n.clinicalNotes.find(x => x.id === 'n052');
  const rectal = d.cancers.find(x => x.id === 'rectal');
  assert.ok(article && rectal);
  const text = JSON.stringify(article);
  for(const datum of ['825mg/m²','1.31','1.64','900mg','1,200mg','1,500mg','Grade2','eGFR']) assert.ok(text.includes(datum), datum);
  const known = new Set(d.sources.map(x => x.id));
  for(const id of article.refs) assert.ok(known.has(id), id);
  assert.ok(rectal.regimens.some(x => x.dose.includes('50 Gy/25 fr')));
  assert.equal(d.sources.length, 72);
  assert.equal(n.count, 51);
});
test('local storage key is maintained and PWA cache refreshed', () => {
  assert.ok(read('index.html').includes("const KEY='rt_reference_beta_v01'"));
  assert.ok(read('sw.js').includes('rt-reference-beta-v051-capecitabine'));
});
