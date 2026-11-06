import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 }).split('\0').filter(Boolean);
const failures = [];
const fail = (check, file, reason) => failures.push(`${check}: ${file}: ${reason}`);

for (const record of git('ls-files', '--eol', '-z')) {
  const tab = record.indexOf('\t');
  const info = record.slice(0, tab);
  if (!/\battr\/-text\b/.test(info) && /(?:^|\s)[iw]\/crlf(?:\s|$)/.test(info)) {
    fail('line-endings', record.slice(tab + 1), `CRLF line endings (${info.trim().replace(/\s+/g, ' ')})`);
  }
}

for (const file of git('ls-files', '-ci', '--exclude-standard', '-z')) {
  fail('ignored-types', file, 'tracked file matches an ignore rule');
}

const entries = {};
for (const [kind, directory] of [['case', 'cases'], ['pattern', 'patterns'], ['material', 'materials']]) {
  entries[kind] = new Map(fs.readdirSync(path.join(root, 'entries', directory)).filter(name => name.endsWith('.json')).map(name => {
    const file = `entries/${directory}/${name}`;
    const entry = { ...JSON.parse(fs.readFileSync(path.join(root, file), 'utf8')), _file: file };
    return [entry.id, entry];
  }));
}

for (const entry of entries.case.values()) {
  for (const id of entry.patternIds || []) {
    const pattern = entries.pattern.get(id);
    if (!pattern) fail('references', entry._file, `patternIds references missing pattern ${id}`);
    else if (!(pattern.sources || []).some(source => source.caseId === entry.id)) {
      fail('references', entry._file, `patternIds ${id} has no reciprocal sources[].caseId ${entry.id} in ${pattern._file}`);
    }
  }
}
for (const entry of entries.pattern.values()) {
  for (const { caseId } of entry.sources || []) {
    const source = entries.case.get(caseId);
    if (!source) fail('references', entry._file, `sources[].caseId references missing case ${caseId}`);
    else if (!(source.patternIds || []).includes(entry.id)) {
      fail('references', entry._file, `sources[].caseId ${caseId} has no reciprocal patternIds ${entry.id} in ${source._file}`);
    }
  }
  for (const field of ['pairsWellWith', 'conflicts']) {
    for (const id of entry.composition?.[field] || []) {
      if (!entries.pattern.has(id)) fail('references', entry._file, `composition.${field} references missing pattern ${id}`);
    }
  }
}
for (const entry of entries.material.values()) {
  for (const { kind, id } of entry.relatedEntries || []) {
    if (!entries[kind]?.has(id)) fail('references', entry._file, `relatedEntries references missing ${kind} ${id}`);
  }
}

// Files over 50 MiB fail unless the owner approved them here: [path, reason].
const oversizeAllowed = new Map([]);
const maxBytes = 50 * 1024 * 1024;
const notes = [];
for (const file of new Set(git('ls-files', '--cached', '--others', '--exclude-standard', '-z'))) {
  const absolute = path.join(root, file);
  if (!fs.existsSync(absolute)) continue;
  const { size } = fs.statSync(absolute);
  if (size <= maxBytes) continue;
  const reason = `${size} bytes exceeds ${maxBytes} bytes (50 MiB)`;
  if (oversizeAllowed.has(file)) notes.push(`file-size: ${file}: ${reason} (allowed: ${oversizeAllowed.get(file)})`);
  else fail('file-size', file, reason);
}
if (notes.length) console.warn(notes.join('\n'));

if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  const count = Object.values(entries).reduce((total, list) => total + list.size, 0);
  console.log(`PASS: ${count} entries; line endings, ignored tracked files, entry references and file sizes are valid.`);
}
