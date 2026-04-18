import fs from 'fs';
import path from 'path';

const repoRoot = path.resolve(process.cwd(), '..');
const csvPath = path.join(repoRoot, 'results', 'leaderboard.csv');
const jsonPath = path.join(process.cwd(), 'docs', 'public', 'leaderboard.json');
const mdPath = path.join(process.cwd(), 'docs', 'index.md');

const parseCsv = (content) => {
  const lines = content.trim().split(/?
/);
  const headers = lines.shift().split(',');
  return lines.map((line) => {
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
};

if (!fs.existsSync(csvPath)) {
  throw new Error(`leaderboard.csv not found: ${csvPath}`);
}

const content = fs.readFileSync(csvPath, 'utf8');
const data = parseCsv(content);
fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');

const tableLines = [
  '| 排名 | 学生 | 01 | 02 | 03 | 04 | 05 | 总分 | 已评分题数 |',
  '| --- | --- | --- | --- | --- | --- | --- | --- | --- |'
];

if (data.length === 0) {
  tableLines.push('| - | 暂无数据 | - | - | - | - | - | - | - |');
} else {
  data.forEach((item, idx) => {
    tableLines.push(`| ${idx + 1} | ${item.student_username} | ${item.task_01} | ${item.task_02} | ${item.task_03} | ${item.task_04} | ${item.task_05} | ${item.total_score} | ${item.graded_count} |`);
  });
}

const md = [
  '# dev-2026 排行榜',
  '',
  '这个页面会根据仓库中的 `results/leaderboard.csv` 自动生成。',
  '',
  ...tableLines,
  '',
  '> 页面数据构建时间由 GitHub Actions 在构建时决定。'
].join('
');

fs.writeFileSync(mdPath, md + '
', 'utf8');
console.log('Generated:', jsonPath);
console.log('Generated:', mdPath);
