'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const data = JSON.parse(read('data.json'));
const clinical = JSON.parse(read('clinical_notes.json'));
const sandbox = { window: {} };
vm.runInNewContext(read('data.js'), sandbox, { filename: 'data.js' });
const note = data.clinicalNotes.find(x => x.id === 'n054');
test('skin care reference is present and synchronized in both data sources', () => {
  assert.equal(data.version, '0.5.3');
  assert.equal(data.clinicalNotes.length, 53);
  assert.equal(clinical.count, 53);
  assert.equal(clinical.version, data.version);
  assert.deepEqual(clinical.clinicalNotes, data.clinicalNotes);
  assert.equal(JSON.stringify(sandbox.window.RT_SEED), JSON.stringify(data));
});
test('breast toxicity article has complete risk and treatment sections', () => {
  assert.ok(note);
  assert.equal(note.cancer, 'breast');
  assert.equal(note.section, 'toxicity');
  assert.equal(note.details.length, 6);
  const content = JSON.stringify(note);
  for (const term of ['低リスク', '中リスク', '高リスク', 'bolus',
    'リンデロンV', 'ヒルドイド', '湿性落屑', '保険',
    '検証済みスコアではない', 'Mepitel Film']) {
    assert.ok(content.includes(term), 'Missing: ' + term);
  }
  assert.equal(data.clinicalNotes.filter(x => x.id === note.id).length, 1);
  for (const ref of note.refs) assert.ok(data.sources.some(s => s.id === ref), 'Missing ref: ' + ref);
});
test('article navigation and offline seed update remain supported', () => {
  const index = read('index.html');
  const sw = read('sw.js');
  assert.match(index, /<script src="data.js"><\/script>/);
  assert.match(index, /#article\//);
  assert.match(index, /Version 0\.5\.3/);
  assert.match(sw, /const CACHE_NAME='rt-reference-beta-v0\d+-[^']+'/);
  assert.match(sw, /cache\.addAll\(ASSETS\)/);
  assert.match(sw, /\.\/data\.js/);
});
