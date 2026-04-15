# Rubric

Total score: 100

## 1. Environment setup and dependency management, 20

Check:
- Whether venv is part of the workflow
- Whether requirements are present and reasonable

Suggested scoring:
- 16-20: environment setup is clear and correct
- 10-15: mostly acceptable
- 0-9: weak setup guidance

## 2. API key configuration, 20

Check:
- Whether DEEPSEEK_API_KEY is read from environment variables
- Whether no real key is hardcoded

Suggested scoring:
- 16-20: safe and correct
- 10-15: mostly correct
- 0-9: unsafe or incorrect

## 3. DeepSeek API calling ability, 25

Check:
- Whether request logic is correct
- Whether parameters are basically correct
- Whether valid replies can be obtained

Suggested scoring:
- 20-25: API logic is complete
- 12-19: basic completion
- 0-11: major issues

## 4. Terminal streaming chat implementation, 25

Check:
- Whether terminal input loop exists
- Whether output is streamed progressively
- Whether exit commands are supported

Suggested scoring:
- 20-25: complete CLI chat loop
- 12-19: partial completion
- 0-11: major missing behavior

## 5. Code quality and README, 10

Check:
- Whether code is readable
- Whether README explains how to run it

Suggested scoring:
- 8-10: readable and explained
- 5-7: acceptable
- 0-4: messy or undocumented
