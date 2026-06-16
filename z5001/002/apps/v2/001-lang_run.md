For a browser-only multi-language runner, the typical stack is:

| Language   | Runtime in Browser          | Installation                                         |
| ---------- | --------------------------- | ---------------------------------------------------- |
| Python     | Pyodide                     | `npm install pyodide`                                |
| R          | WebR                        | `npm install webr`                                   |
| C++        | clang.wasm or WASM compiler | `npm install @wasmer/sdk` (or use clang.wasm bundle) |
| JavaScript | Native Browser Engine       | No installation                                      |

---

# Recommended Architecture

```text
AppLangEditor
│
├── Language Selector
│      ├── Python
│      ├── R
│      ├── C++
│      └── JavaScript
│
├── Runtime Manager
│      ├── Pyodide
│      ├── WebR
│      ├── ClangWasm
│      └── JS Engine
│
├── Editor
│
├── Output Console
│
└── Restart Kernel
```

---

# Install

```bash
npm install pyodide
npm install webr
npm install react-icons
```

For C++:

```bash
npm install @wasmer/sdk
```

or integrate:

```text
clang.wasm
xeus-cpp
```

similar to JupyterLite.

---

# Language Templates

```javascript
const templates = {
  python: `for i in range(5):
    print(i)`,

  r: `for(i in 1:5){
  print(i)
}`,

  cpp: `#include <iostream>
using namespace std;

int main() {
    for(int i=0;i<5;i++)
        cout << i << endl;
    return 0;
}`,

  javascript: `for(let i=0;i<5;i++){
  console.log(i);
}`
};
```

---

# Runtime Initialization

```javascript
const [language, setLanguage] =
  useState("python");

const [pyodide, setPyodide] =
  useState(null);

const [webR, setWebR] =
  useState(null);
```

---

# Load Runtime Based On Language

```javascript
useEffect(() => {

  async function loadRuntime() {

    setOutput("Loading runtime...");

    if(language === "python") {

      const py =
        await loadPyodide();

      setPyodide(py);

      setOutput("Python Ready");
    }

    else if(language === "r") {

      const r = new WebR();

      await r.init();

      setWebR(r);

      setOutput("R Ready");
    }

    else if(language === "javascript") {

      setOutput("JavaScript Ready");
    }

    else if(language === "cpp") {

      setOutput(
        "C++ Compiler Ready"
      );
    }
  }

  loadRuntime();

}, [language]);
```

---

# Run Python

```javascript
const runPython = async () => {

  let result = "";

  pyodide.setStdout({
    batched: text => {
      result += text + "\n";
    }
  });

  await pyodide.runPythonAsync(code);

  return result;
};
```

---

# Run R

```javascript
const runR = async () => {

  await webR.evalRVoid(code);

  const output =
    await webR.flush();

  return output
    .map(x => x.data)
    .join("\n");
};
```

---

# Run JavaScript

```javascript
const runJS = () => {

  let output = "";

  const oldLog = console.log;

  console.log = (...args) => {
    output += args.join(" ") + "\n";
  };

  try {

    eval(code);

    return output;

  } finally {

    console.log = oldLog;
  }
};
```

---

# Run C++

For C++ you cannot simply do:

```cpp
#include<iostream>
```

inside React.

You need:

```text
Code
 ↓
clang.wasm
 ↓
Compile to WASM
 ↓
Execute WASM
 ↓
Capture stdout
```

Pseudo:

```javascript
const result =
 await cppCompiler.run(code);

return result.stdout;
```

Libraries:

* clang.wasm
* xeus-cpp
* Wasmer
* JupyterLite C++ kernel

The easiest production option is to reuse the same WASM compiler/kernel used by JupyterLite.

---

# Unified Run Function

```javascript
const runCode = async () => {

  try {

    setIsRunning(true);

    let result = "";

    switch(language) {

      case "python":
        result =
          await runPython();
        break;

      case "r":
        result =
          await runR();
        break;

      case "javascript":
        result =
          runJS();
        break;

      case "cpp":
        result =
          await runCpp();
        break;

      default:
        result =
          "Unsupported Language";
    }

    setOutput(result);

  }
  catch(err) {

    setOutput(err.toString());
  }
  finally {

    setIsRunning(false);
  }
};
```

---

# Language Selector UI

```jsx
<select
  value={language}
  onChange={(e) => {

    setLanguage(e.target.value);

    setCode(
      templates[e.target.value]
    );
  }}
  className="rounded border p-2"
>
  <option value="python">
    Python
  </option>

  <option value="r">
    R
  </option>

  <option value="cpp">
    C++
  </option>

  <option value="javascript">
    JavaScript
  </option>
</select>
```

---

# Better Kernel Restart

Instead of:

```javascript
window.location.reload();
```

destroy and recreate only the selected runtime.

```javascript
const restartKernel =
  async () => {

    setOutput(
      "Restarting..."
    );

    if(language==="python") {

      const py =
        await loadPyodide();

      setPyodide(py);
    }

    if(language==="r") {

      const r = new WebR();

      await r.init();

      setWebR(r);
    }

    setOutput(
      "Kernel Restarted"
    );
};
```

This behaves much closer to Jupyter Notebook and JupyterLite.

---

# Production-Grade Choice

If your goal is similar to JupyterLite:

```text
Python  -> Pyodide
R       -> WebR
JS      -> Native Browser
C++     -> xeus-cpp (WASM)
```

This is the same direction used by browser-based notebook environments and will scale much better than trying to emulate all languages through a single runtime.
