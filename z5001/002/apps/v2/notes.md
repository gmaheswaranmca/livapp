# **Develop Browser Based React App to run python programin in browser**
## Create vite project 
```bash
$ npm create react@latest . -- --template react

$ npm install pyodide

$ npm install react-icons
```
## vite.config.js
```
import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    exclude: ['pyodide']
  }
})
```

## Component
src/AppPythonEditor.jsx
```
import { useState, useEffect } from "react";
import { loadPyodide } from "pyodide";

function AppPythonEditor() {
  const [pyodide, setPyodide] = useState(null);
  const [code, setCode] = useState(
`for i in range(5):
    print(i)`
  );
  const [output, setOutput] = useState("Loading Python...");

  useEffect(() => {
    async function init() {
      const py = await loadPyodide();
      setPyodide(py);
      setOutput("Python Ready");
    }

    init();
  }, []);

  const runCode = async () => {
    if (!pyodide) return;

    try {
      let result = "";

      pyodide.setStdout({
        batched: (text) => {
          result += text + "\n";
        }
      });

      await pyodide.runPythonAsync(code);

      setOutput(result || "Code executed successfully");
    } catch (err) {
      setOutput(err.toString());
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Python Runner</h2>

      <textarea
        rows={15}
        cols={80}
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <br /><br />

      <button onClick={runCode}>
        Run
      </button>

      <h3>Output</h3>

      <pre>{output}</pre>
    </div>
  );
}

export default App;
```

## Flow
```
React App
    |
    v
Load Pyodide
    |
    v
Python Interpreter in Browser
    |
    v
User Types Python Code
    |
Click Run
    |
    v
runPythonAsync()
    |
    v
Output Displayed
```

## Examples
Example 1
```py
print("Hello World")
```

Example 2
```py
for i in range(1, 6):
    print(i)
```

Example 3
```py
def add(a, b):
    return a + b
print(add(10, 20))
```

## Limitations
Browser-only Pyodide supports:
- ✅ Variables
- ✅ Functions
- ✅ Classes
- ✅ Lists, Dictionaries
- ✅ NumPy (load package)
- ✅ Pandas (load package)

Not suitable for:
- ❌ Direct OS access (os.system)
- ❌ Running local executables
- ❌ Server-side tasks
- ❌ Long-running heavy programs