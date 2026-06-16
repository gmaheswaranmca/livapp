# Installations
```
npm install pyodide
npm install webr
npm install react-icons
npm install @wasmer/sdk
```

# Stack 
| Language   | Runtime in Browser          | Installation                                         |
| ---------- | --------------------------- | ---------------------------------------------------- |
| Python     | Pyodide                     | `npm install pyodide`                                |
| R          | WebR                        | `npm install webr`                                   |
| C++        | clang.wasm or WASM compiler | `npm install @wasmer/sdk` (or use clang.wasm bundle) |
| JavaScript | Native Browser Engine       | No installation                                      |

# Architecture
```
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