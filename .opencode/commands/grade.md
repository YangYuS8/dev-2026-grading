---
description: Grade a dev-2026 submission issue by number using the grade-submission skill in this repository.
---

Use the `grade-submission` skill in this repository to process GitHub issue #$ARGUMENTS.

Required workflow:

1. Read the issue with `gh issue view $ARGUMENTS --json number,title,body,url`.
2. Parse the student GitHub username, task repo name, submission repo URL, and notes.
3. Route to the correct assessment skill based on task repo name.
4. Clone the student submission repository.
5. Grade the submission.
6. Reply to the issue with the grading result.
7. Update `results/grades.csv` using:
   `node scripts/update_grades_csv.js '<json-payload>'`
8. Rebuild the leaderboard using:
   `node scripts/build_leaderboard.js`
9. Close the issue.

If the submission is incomplete but still gradable, use `status=partial`.
If the repository is invalid or inaccessible, use `status=invalid` or `status=error`, still write a CSV row, and still leave an issue reply.
