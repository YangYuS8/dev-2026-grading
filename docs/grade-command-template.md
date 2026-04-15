# `/grade` 执行模板

这份文档是给操作者用的，不是给学生看的。

## 推荐输入方式

在 OpenCode 里，推荐直接输入：

```text
grade issue 12 using the grade-submission skill in this repo. read the issue with gh, detect the task repo, grade the submission with the matching assessment skill, reply to the issue, update results/grades.csv, close the issue, then rebuild the leaderboard.
```

如果你想用更短的习惯写法，也可以：

```text
/grade 12
```

但更短的写法前提是你自己已经习惯让 OpenCode 把它理解为同一套流程。

---

## 推荐执行顺序

1. `gh issue view <编号>`
2. 解析学生信息与提交仓库地址
3. 识别题目仓库名
4. 路由到对应评分 skill
5. 生成评分结果
6. `gh issue comment`
7. 调用 `node scripts/update_grades_csv.js '<json>'`
8. `gh issue close <编号>`
9. 调用 `node scripts/build_leaderboard.js`

---

## 如果学生提交不完整

推荐处理方式：

- 能评的部分继续评
- 明确写出缺失项
- `status` 记为 `partial`
- 仍然写 CSV
- 仍然更新排行榜
