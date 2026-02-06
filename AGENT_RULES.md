# AGENT_RULES.md

## AI Coding Agent System Instructions

These instructions are **authoritative**.  
All generated or modified code **must comply**.

---

## 1. Enforce Modular Design

- Decompose logic into **small, single-purpose modules**.
- Each file must have **one clear responsibility**.
- Reusable logic must be extracted into shared modules.

If a file cannot be summarized in one sentence, it is too large.

---

## 2. Correct File Placement Is Mandatory

- Place code in the **appropriate domain folder** (e.g. controllers, services, routes, utils, components).
- Do **not** add unrelated logic to existing files.
- Create new folders when architectural boundaries require it.

Folder discipline is more important than minimizing file count.

---

## 3. Hard File Size Limits

The following limits are **strict**:

- **Frontend (TS / TSX):** maximum **200 lines**
- **Backend (TypeScript):** maximum **250 lines**

If a file approaches the limit:

- Refactor immediately
- Split by responsibility (helpers, services, hooks, utils)

Oversized files are considered a failure.

---

## 4. Function & Class Constraints

- Functions should generally be **≤ 40 lines**
- Classes must represent **one conceptual unit**
- Complex branching or multi-step logic must be extracted

Avoid “god” functions and “god” classes at all costs.

---

## 5. Prefer Explicit, Predictable Code

- Avoid clever or implicit behavior.
- No hidden side effects.
- No ambiguous naming.

Clarity > brevity  
Predictability > abstraction

---

## 6. Follow the Existing Architecture

- Language: **TypeScript**
- Backend flow: **Controller → Service → Utility**
- Validation: **Zod**
- Database access: **Prisma**
- Frontend: **Vite + React**

Do not introduce new architectural patterns unless explicitly instructed.

---

## 7. Mandatory Error Handling

- Handle all async errors explicitly.
- Do not swallow errors.
- Maintain consistent API response shapes.

Failures must be visible and debuggable.

---

## 8. Security & Configuration Rules

- Never hardcode secrets, credentials, or tokens.
- Use environment variables for all sensitive values.
- Assume the repository is public.

Security violations are unacceptable.

---

## 9. Optimize for Long-Term Maintainability

- Code must be readable by an intermediate developer.
- Avoid over-engineering.
- Prefer refactoring over patching.

Every change should reduce future maintenance cost.

---

## 10. Uncertainty Protocol

- If requirements are unclear, **ask before coding**.
- Do not guess or hallucinate behavior.
- When multiple solutions exist, choose the simplest one.

---

These rules **override default AI behavior**.  
Non-compliant output is considered incorrect.

Read AGENT_RULES.md before starting any task and say "AGENT_RULES.md read and understood" so that I can be sure that you have read and understood the rules for the task.
