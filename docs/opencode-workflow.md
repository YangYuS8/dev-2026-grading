# OpenCode 评分工作流

本仓库专门面向 OpenCode。

## 关键点

本仓库现在同时提供两类东西：

### 1. 项目内 skills
位置：

```text
.opencode/skills/
```

作用：
- 提供评分规则
- 提供总入口评分流程

### 2. 项目内 commands
位置：

```text
.opencode/commands/
```

作用：
- 提供 `/grade` 这样的命令入口

---

## `/grade` 是怎么来的

`/grade` 不是 skill 自动生成的，而是通过项目内 command 提供的。

本仓库已经新增：

- `.opencode/commands/grade.md`

所以你在仓库根目录启动 `opencode` 后，理论上就应该能使用：

```text
/grade <issue编号>
```

例如：

```text
/grade 12
```

---

## 推荐流程

1. clone 本仓库
2. 进入仓库根目录
3. 启动 `opencode`
4. OpenCode 读取：
   - `.opencode/skills/`
   - `.opencode/commands/`
5. 执行：

```text
/grade <issue编号>
```

6. agent 自动完成：
   - `gh issue view`
   - 解析学生用户名、题目仓库名、提交仓库地址、备注
   - 路由到对应评分 skill
   - clone 学生仓库
   - 评分
   - `gh issue comment`
   - 更新 `results/grades.csv`
   - `node scripts/build_leaderboard.js`
   - 关闭 issue

## 主入口 skill

- `.opencode/skills/grade-submission`

## `/grade` 命令入口

- `.opencode/commands/grade.md`

## 单题评分 skills

- `.opencode/skills/assessment-html-css-beginner`
- `.opencode/skills/assessment-js-api-beginner`
- `.opencode/skills/assessment-python-data-cleaning-beginner`
- `.opencode/skills/assessment-python-deepseek-cli-beginner`
- `.opencode/skills/assessment-python-tcp-beginner`

## 辅助脚本

- `scripts/update_grades_csv.js`
- `scripts/build_leaderboard.js`
