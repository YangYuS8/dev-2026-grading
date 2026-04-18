const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const scripts = [
  'scripts/update_grades_csv.js',
  'scripts/build_leaderboard.js',
];

for (const script of scripts) {
  test(`${script} passes node --check`, () => {
    const result = spawnSync(process.execPath, ['--check', path.join(process.cwd(), script)], {
      encoding: 'utf8',
    });

    assert.equal(result.status, 0, result.stderr || result.stdout);
  });
}
