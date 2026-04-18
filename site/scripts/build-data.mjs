import fs from 'fs';
import path from 'path';

const repoRoot = path.resolve(process.cwd(), '..');
const csvPath = path.join(repoRoot, 'results', 'leaderboard.csv');
const outPath = path.join(process.cwd(), 'docs', 'public', 'leaderboard.json');

const parseCsv = (content) => {
  const lines = content.trim().split(/\r?\n/);
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
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Generated:', outPath);
