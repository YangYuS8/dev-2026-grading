# dev-2026 排行榜

这个页面会根据仓库中的 `results/leaderboard.csv` 自动生成。

<div id="leaderboard-app">加载中...</div>

<script type="module">
async function loadLeaderboard() {
  const root = document.getElementById('leaderboard-app')
  try {
    const res = await fetch('/dev-2026-grading/leaderboard.json')
    const data = await res.json()

    if (!Array.isArray(data) || data.length === 0) {
      root.innerHTML = '<p>当前还没有排行榜数据。</p>'
      return
    }

    const rows = data.map((item, idx) => `
      <tr>
        <td>${idx + 1}</td>
        <td>${item.student_username}</td>
        <td>${item.task_01}</td>
        <td>${item.task_02}</td>
        <td>${item.task_03}</td>
        <td>${item.task_04}</td>
        <td>${item.task_05}</td>
        <td><strong>${item.total_score}</strong></td>
        <td>${item.graded_count}</td>
      </tr>
    `).join('')

    root.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>排名</th>
            <th>学生</th>
            <th>01</th>
            <th>02</th>
            <th>03</th>
            <th>04</th>
            <th>05</th>
            <th>总分</th>
            <th>已评分题数</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `
  } catch (err) {
    root.innerHTML = `<p>加载排行榜失败：${err.message}</p>`
  }
}
loadLeaderboard()
</script>
