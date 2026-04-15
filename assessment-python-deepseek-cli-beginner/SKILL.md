---
name: assessment-python-deepseek-cli-beginner
description: Grade beginner Python DeepSeek CLI chat assessment submissions for dev-2026 style tasks. Use when evaluating a student's repo that must use venv, read DEEPSEEK_API_KEY from environment variables, call the DeepSeek API, stream replies in the terminal, support a chat loop, and document usage in README.
---

# assessment-python-deepseek-cli-beginner

Use this skill when grading beginner Python CLI chat submissions that call the DeepSeek API.

## What to grade

Evaluate the submission against these dimensions:

1. Environment setup and dependency management, 20 points
2. API key configuration, 20 points
3. DeepSeek API calling ability, 25 points
4. Terminal streaming chat implementation, 25 points
5. Code quality and README, 10 points

Read the detailed rubric before grading:

- `references/rubric.md`

## How to grade

1. Read `README.md` if present.
2. Read `main.py` first.
3. Read `requirements.txt` and `.env.example` if needed.
4. Check whether the student:
   - uses venv in the documented workflow
   - reads `DEEPSEEK_API_KEY` from environment variables
   - does not hardcode a real key
   - calls the DeepSeek API correctly
   - supports repeated terminal input
   - streams output progressively
   - supports exit commands
5. Prefer basic correctness over advanced structure.
6. Use the format in `references/output-format.md`.

## Grading principles

- This task targets beginners, so do not require advanced architecture.
- Reward a complete basic CLI flow.
- If the logic is clear and works, do not over-penalize simple structure.
- Penalize missing key safety, broken API usage, or missing streaming behavior.
