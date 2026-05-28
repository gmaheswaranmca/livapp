Good. Now migrate Phase 1 UI to Tailwind CSS.

This is a better long-term direction for your coding platform.

# Step 1 — Install Tailwind CSS

Inside project:

```bash id="9kksmo"
npm install -D tailwindcss @tailwindcss/vite
```

---

# Step 2 — Update Vite Config

## `vite.config.js`

Replace with:

```js id="lfalpw"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

---

# Step 3 — Update CSS

## `src/index.css`

Replace everything with:

```css id="8sr4d9"
@import "tailwindcss";

html,
body,
#root {
  height: 100%;
}

body {
  margin: 0;
}
```

---

# Step 4 — Remove Old CSS

Delete:

* `App.css`

Remove import:

```js id="6w7a8i"
import "./App.css";
```

from `App.jsx`.

---

# Step 5 — Update Problem Panel

## `ProblemPanel.jsx`

```jsx id="jtdg1i"
function ProblemPanel({ problem }) {
  return (
    <div className="
      w-[35%]
      border-r
      border-gray-700
      p-5
      overflow-y-auto
      bg-[#1e1e1e]
      text-white
    ">
      <h2 className="
        text-2xl
        font-bold
        mb-5
      ">
        {problem.title}
      </h2>

      <pre className="
        whitespace-pre-wrap
        leading-7
        text-sm
      ">
        {problem.statement}
      </pre>
    </div>
  );
}

export default ProblemPanel;
```

---

# Step 6 — Update Editor Component

## `CodeEditor.jsx`

```jsx id="k2e7ca"
import Editor from "@monaco-editor/react";

function CodeEditor({ code, setCode }) {
  return (
    <div className="flex-1">
      <Editor
        height="100%"
        defaultLanguage="python"
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value)}
        options={{
          fontSize: 16,
          minimap: {
            enabled: false
          }
        }}
      />
    </div>
  );
}

export default CodeEditor;
```

---

# Step 7 — Update Toolbar

## `Toolbar.jsx`

```jsx id="jlwm85"
function Toolbar({ runCode }) {
  return (
    <div className="
      px-4
      py-3
      border-t
      border-b
      border-gray-700
      bg-[#252526]
    ">
      <button
        onClick={runCode}
        className="
          bg-blue-600
          hover:bg-blue-700
          px-5
          py-2
          rounded
          text-white
          font-medium
        "
      >
        Run
      </button>
    </div>
  );
}

export default Toolbar;
```

---

# Step 8 — Update Output Console

## `OutputConsole.jsx`

```jsx id="1h1zvw"
function OutputConsole({ output }) {
  return (
    <div className="
      h-[180px]
      overflow-y-auto
      bg-black
      text-green-400
      p-4
      font-mono
    ">
      <h3 className="text-white mb-3">
        Output
      </h3>

      <pre className="text-sm">
        {output}
      </pre>
    </div>
  );
}

export default OutputConsole;
```

---

# Step 9 — Update App.jsx

## `App.jsx`

```jsx id="jlwm84"
import { useState } from "react";

import problem from "./data/problem";

import ProblemPanel from "./components/ProblemPanel";
import CodeEditor from "./components/CodeEditor";
import Toolbar from "./components/Toolbar";
import OutputConsole from "./components/OutputConsole";

function App() {

  const [code, setCode] = useState(
    problem.starterCode
  );

  const [output, setOutput] = useState("");

  function runCode() {
    setOutput(
`Running...

Code submitted successfully.`
    );
  }

  return (
    <div className="
      h-screen
      flex
      flex-col
      bg-[#1e1e1e]
    ">

      <div className="flex flex-1 overflow-hidden">

        <ProblemPanel problem={problem} />

        <CodeEditor
          code={code}
          setCode={setCode}
        />

      </div>

      <Toolbar runCode={runCode} />

      <OutputConsole output={output} />

    </div>
  );
}

export default App;
```

---

# Step 10 — Run Project

```bash id="npp25m"
npm run dev
```

---

# What You Now Have

* ✅ Tailwind-based layout
* ✅ Monaco editor
* ✅ Dark coding UI
* ✅ Responsive structure foundation
* ✅ Cleaner styling system
* ✅ Easier future scaling

---

# NEXT RECOMMENDED STEP

Now you should implement:

```text id="mjlwm7"
Phase 2
   ↓
Pyodide integration using Web Worker
```

NOT:

* authentication
* database
* sync engine
* debugger

Execution engine should come next.
