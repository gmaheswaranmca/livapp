For a **LeetCode-like browser IDE** with **Python, R, C++, and JavaScript running entirely in the browser**, I would separate the project into **5 layers**.

```text
src/

├── App.jsx

├── pages/
│   ├── HomePage.jsx
│   ├── ProblemPage.jsx
│   └── PlaygroundPage.jsx

├── components/
│
│   ├── editor/
│   │    ├── AppLangEditor.jsx
│   │    ├── CodeEditor.jsx
│   │    ├── LanguageSelector.jsx
│   │    ├── Toolbar.jsx
│   │    └── OutputPanel.jsx
│   │
│   ├── problem/
│   │    ├── ProblemDescription.jsx
│   │    ├── ExampleCases.jsx
│   │    ├── Constraints.jsx
│   │    └── TestCasePanel.jsx
│   │
│   └── layout/
│        ├── Header.jsx
│        └── Sidebar.jsx
│
├── runtimes/
│
│   ├── python/
│   │     └── pyodideRuntime.js
│   │
│   ├── r/
│   │     └── webRRuntime.js
│   │
│   ├── cpp/
│   │     └── cppRuntime.js
│   │
│   └── javascript/
│         └── jsRuntime.js
│
├── services/
│
│   ├── RuntimeFactory.js
│   ├── CodeRunner.js
│   └── KernelManager.js
│
├── hooks/
│
│   ├── useRuntime.js
│   ├── useEditor.js
│   └── useOutput.js
│
├── store/
│
│   ├── editorStore.js
│   └── problemStore.js
│
├── data/
│
│   └── problems.js
│
├── templates/
│
│   ├── pythonTemplate.js
│   ├── rTemplate.js
│   ├── cppTemplate.js
│   └── jsTemplate.js
│
└── utils/
      └── helpers.js
```

---

# 1. Editor Layer

This is your visible IDE.

```text
AppLangEditor

   Toolbar
      Run
      Submit
      Restart Kernel
      Language

   CodeEditor

   OutputPanel

   TestCases
```

Example:

```text
-----------------------------------------
Two Sum

Description ....

-----------------------------------------

Language : Python ▼

-----------------------------------------
def twoSum(nums,target):


-----------------------------------------

Run     Submit

-----------------------------------------

Output

[0,1]

-----------------------------------------
```

---

# 2. Runtime Layer

Each language has its own engine.

```text
runtimes

python
    pyodideRuntime.js

r
    webRRuntime.js

cpp
    cppRuntime.js

javascript
    jsRuntime.js
```

Each runtime exposes the SAME API:

```javascript
init()

run(code)

restart()

destroy()
```

Example:

```javascript
class PythonRuntime {

 init(){}

 run(code){}

 restart(){}

 destroy(){}

}
```

---

# 3. RuntimeFactory

This is very important.

Instead of:

```javascript
if(language==="python")
...

if(language==="r")
...
```

Create:

```javascript
RuntimeFactory.get(language)
```

returns

```text
python
   ↓
PyodideRuntime

r
   ↓
WebRRuntime

cpp
   ↓
CppRuntime

javascript
   ↓
JSRuntime
```

---

# 4. KernelManager

LeetCode maintains the kernel separately.

```text
KernelManager

currentRuntime

load()

restart()

switchLanguage()

destroy()
```

Example:

```javascript
KernelManager.switchLanguage("r")
```

Internally:

```text
Destroy Python

Create WebR

Initialize

Ready
```

---

# 5. CodeRunner

This executes code.

```javascript
run(language, code)
```

internally:

```javascript
runtime =
 RuntimeFactory.get(language)

result =
 await runtime.run(code)
```

---

# 6. Language Templates

```text
templates

python

r

cpp

javascript
```

Example:

```javascript
export const pythonTemplate =

`def solve():

    print("Hello")

solve()
`
```

---

# 7. Problem Store

For LeetCode questions:

```javascript
{
 id:1,

 title:"Two Sum",

 difficulty:"Easy",

 description:"...",

 examples:[ ],

 constraints:[ ],

 starterCode:{

   python:"",

   r:"",

   cpp:"",

   javascript:""

 },

 testcases:[ ]
}
```

---

# 8. Recommended AppLangEditor Structure

```text
AppLangEditor

states

language

code

output

runtime

isRunning

--------------------------------

Toolbar

Run

Submit

Restart

Language Selector

--------------------------------

CodeEditor

--------------------------------

Test Cases

--------------------------------

Output Console
```

---

# 9. Runtime Folder Details

## python

```text
pyodideRuntime.js

loadPyodide()

runPythonAsync()

setStdout()

restart()
```

---

## r

```text
webRRuntime.js

new WebR()

init()

evalR()

flush()

restart()
```

---

## javascript

```text
jsRuntime.js

eval()

capture console.log

restart()
```

---

## cpp

```text
cppRuntime.js

clang.wasm

compile()

execute()

capture stdout

restart()
```

---

# 10. Production Folder Structure (Recommended)

This is the structure I would use if building a **real LeetCode clone**:

```text
src

pages

components

runtimes

services

templates

hooks

store

utils

data
```

where

```text
components
    UI only

runtimes
    Pyodide/WebR/Cpp/JS

services
    KernelManager
    RuntimeFactory
    CodeRunner

data
    Problems

templates
    Starter code

store
    Editor state
    Problem state
```

This design keeps the **editor UI completely independent of the language runtime**, allowing you to add more languages later (for example SQL, Java, Go, or Rust) by simply adding another runtime file and registering it in `RuntimeFactory`.
