#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '..', 'results', 'grades.csv');
const payload = process.argv[2];

if (!payload) {
  console.error('Usage: node scripts/update_grades_csv.js <json-payload>');
  process.exit(1);
}

const row = JSON.parse(payload);
const headers = [
  'student_username',
  'task_repo',
  'submission_repo',
  'score',
  'graded_at',
  'issue_number',
  'status',
  'notes'
];

if (!fs.existsSync(csvPath)) {
  fs.writeFileSync(csvPath, headers.join(',') + '\n', 'utf8');
}

const escapeCsv = (value) => {
  const s = String(value ?? '');
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
};

const line = headers.map((key) => escapeCsv(row[key] ?? '')).join(',') + '\n';
fs.appendFileSync(csvPath, line, 'utf8');
console.log('CSV updated:', csvPath);
