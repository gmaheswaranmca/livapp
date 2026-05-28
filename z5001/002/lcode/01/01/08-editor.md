I have to create a react app with editor first.

---

That is the correct first step.

Do NOT start with:

* Pyodide
* sync engine
* debugger
* SQLite WASM
* multi-device logic

First build:

```text id="xk8cq9"
React App
   ├── Problem Panel
   ├── Monaco Editor
   ├── Run Button
   └── Output Console
```

Get this stable first.

# Recommended Phase-wise Plan

# Phase 1 — Editor MVP

Build ONLY:

```text id="9kn9hr"
Question Display
Code Editor
Run Button
Output Area
```

No backend yet.

---

# Recommended Stack

| Need       | Technology    |
| ---------- | ------------- |
| UI         | React         |
| Editor     | Monaco Editor |
| Styling    | CSS/Tailwind  |
| Build Tool | Vite          |

---

# Create Project

Use:

```bash id="lp3frt"
npm create vite@latest
```

Choose:

* React
* JavaScript initially

Avoid TypeScript first.

---

# Install Monaco

Use:

```bash id="p0yz8x"
npm install @monaco-editor/react
```

This wrapper is easiest.

---

# Initial Layout

Your UI:

```text id="f86srt"
-----------------------------------
| Question Panel | Code Editor   |
|                |               |
|                |               |
-----------------------------------
| Run Button                    |
-----------------------------------
| Output Console                |
-----------------------------------
```

Exactly enough.

---

# Recommended Initial Component Structure

```text id="z3xgub"
src/
 ├── components/
 │    ├── ProblemPanel.jsx
 │    ├── CodeEditor.jsx
 │    ├── OutputConsole.jsx
 │    └── Toolbar.jsx
 │
 ├── App.jsx
 └── main.jsx
```

---

# Initial Problem JSON

Hardcode first.

Example:

```js id="zbce4p"
const problem = {
  title: "Sum Two Numbers",
  statement: "Read two numbers and print sum.",
  starterCode:
`def solve():
    pass`
}
```

Do NOT fetch from server yet.

---

# Monaco Example

Basic setup:

```jsx id="ywmck6"
import Editor from "@monaco-editor/react";

<Editor
  height="500px"
  defaultLanguage="python"
  defaultValue={starterCode}
/>
```

This alone gives:

* syntax highlighting
* line numbers
* themes
* indentation

---

# Add State

```jsx id="v3j1b4"
const [code, setCode] = useState(starterCode);
const [output, setOutput] = useState("");
```

---

# Fake Run Initially

Before Pyodide:

```js id="2z4whm"
function runCode() {
   setOutput("Running...");
}
```

Do NOT integrate Pyodide immediately.

---

# Phase 2 — Add Pyodide

ONLY after editor stable.

Then:

```text id="2ylp8z"
Editor
   ↓
Pyodide Worker
   ↓
Output Console
```

---

# IMPORTANT — Use Worker Early

Even if run button fake initially,
create worker architecture early.

Structure:

```text id="u8lvgo"
Main Thread
   ↓
runtimeWorker.js
```

This avoids major refactor later.

---

# Phase 3 — Problem Loader

Then add:

* JSON loading
* local cache
* IndexedDB

---

# Phase 4 — Test Cases

Then:

* stdin wrapper
* verdict engine
* hidden test cases

---

# Phase 5 — Persistence

Then:

* autosave
* SQLite WASM
* sync queue

---

# Suggested Initial Features ONLY

Your first version should contain ONLY:

✅ Question panel
✅ Monaco editor
✅ Theme support
✅ Run button
✅ Output console

Nothing more.

---

# Recommended UI Style

Keep it VERY simple initially.

Avoid:

* animations
* tabs
* split panes
* docking
* resizable panels

You can add later.

---

# One Important Suggestion

Use a dark theme from day 1.

Students strongly prefer it.

Example:

```jsx id="y9s09x"
theme="vs-dark"
```

---

# Your First Milestone

If you can achieve:

```text id="fchqu4"
Question visible
Editor working
User types code
Run button works
Output shown
```

then your platform foundation is already correct.

Everything else becomes incremental.
