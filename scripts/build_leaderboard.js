#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const gradesPath = path.join(__dirname, '..', 'results', 'grades.csv');
const leaderboardCsvPath = path.join(__dirname, '..', 'results', 'leaderboard.csv');
const leaderboardMdPath = path.join(__dirname, '..', 'results', 'leaderboard.md');

if (!fs.existsSync(gradesPath)) {
  console.error('grades.csv not found');
  process.exit(1);
}

const content = fs.readFileSync(gradesPath, 'utf8').trim();
if (!content) {
  console.error('grades.csv is empty');
  process.exit(1);
}

const lines = content.split(/?
/);
const headers = lines.shift().split(',');
const rows = lines.map((line) => {
  const values = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      values.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  values.push(current);
  const obj = {};
  headers.forEach((h, idx) => (obj[h] = values[idx] || ''));
  return obj;
});

const taskKeys = ['dev-2026-01', 'dev-2026-02', 'dev-2026-03', 'dev-2026-04', 'dev-2026-05'];
const best = new Map();

for (const row of rows) {
  const user = row.student_username;
  const task = row.task_repo;
  const score = Number(row.score || 0);
  if (!user || !taskKeys.includes(task)) continue;
  if (!best.has(user)) {
    best.set(user, { student_username: user, scores: Object.fromEntries(taskKeys.map(t => [t, 0])) });
  }
  const entry = best.get(user);
  entry.scores[task] = Math.max(entry.scores[task], score);
}

const leaderboard = [...best.values()].map(entry => {
  const taskScores = taskKeys.map(t => entry.scores[t] || 0);
  const total = taskScores.reduce((a, b) => a + b, 0);
  const gradedCount = taskScores.filter(s => s > 0).length;
  return {
    student_username: entry.student_username,
    'task_01': entry.scores['dev-2026-01'] || 0,
    'task_02': entry.scores['dev-2026-02'] || 0,
    'task_03': entry.scores['dev-2026-03'] || 0,
    'task_04': entry.scores['dev-2026-04'] || 0,
    'task_05': entry.scores['dev-2026-05'] || 0,
    total_score: total,
    graded_count: gradedCount,
  };
}).sort((a, b) => b.total_score - a.total_score || b.graded_count - a.graded_count || a.student_username.localeCompare(b.student_username));

const csvHeaders = ['student_username', 'task_01', 'task_02', 'task_03', 'task_04', 'task_05', 'total_score', 'graded_count'];
const csvLines = [csvHeaders.join(',')].concat(
  leaderboard.map(row => csvHeaders.map(h => row[h]).join(','))
);
fs.writeFileSync(leaderboardCsvPath, csvLines.join('
') + '
', 'utf8');

const md = [
  '# 排行榜',
  '',
  '| 排名 | 学生 | 01 | 02 | 03 | 04 | 05 | 总分 | 已评分题数 |',
  '| --- | --- | --- | --- | --- | --- | --- | --- | --- |',
  ...leaderboard.map((row, idx) => `| ${idx + 1} | ${row.student_username} | ${row.task_01} | ${row.task_02} | ${row.task_03} | ${row.task_04} | ${row.task_05} | ${row.total_score} | ${row.graded_count} |`)
];
fs.writeFileSync(leaderboardMdPath, md.join('
') + '
', 'utf8');

console.log('Leaderboard generated:');
console.log('-', leaderboardCsvPath);
console.log('-', leaderboardMdPath);
