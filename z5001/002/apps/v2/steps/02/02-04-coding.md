Excellent. We are **officially starting Phase 2 coding**.

---

# Phase 2 - Step 1

## Create Editor Store

File:

```text id="gvzcw5"
src/store/editor/editorStore.js
```

We will keep **all editor state in one place**.

---

## editorStore.js

```javascript
import { create } from "zustand";

const useEditorStore = create((set) => ({

  language: "python",

  theme: "vs-dark",

  fontSize: 14,

  wordWrap: "on",

  code: "",

  output: "Ready",

  activeTab: "output",

  isRunning: false,

  setLanguage: (language) =>

    set({ language }),

  setTheme: (theme) =>

    set({ theme }),

  setFontSize: (fontSize) =>

    set({ fontSize }),

  setWordWrap: (wordWrap) =>

    set({ wordWrap }),

  setCode: (code) =>

    set({ code }),

  setOutput: (output) =>

    set({ output }),

  setActiveTab: (activeTab) =>

    set({ activeTab }),

  setRunning: (isRunning) =>

    set({ isRunning }),

}));

export default useEditorStore;
```

---

# Why do we need this?

Instead of:

```javascript
const [language,setLanguage]

const [theme,setTheme]

const [code,setCode]

const [output,setOutput]
```

in many components,

we do:

```javascript
const {

language,

theme,

code,

output,

setLanguage,

setCode

}

=

useEditorStore();
```

Every component shares the same state.

---

# Step 2

Create:

```text id="slyq5q"
src/constants/

languages.js

themes.js

fonts.js
```

---

## languages.js

```javascript
export const LANGUAGES = [

  {

    value: "python",

    label: "Python",

  },

  {

    value: "r",

    label: "R",

  },

  {

    value: "cpp",

    label: "C++",

  },

  {

    value: "javascript",

    label: "JavaScript",

  },

];
```

---

## themes.js

```javascript
export const THEMES = [

  "vs",

  "vs-dark",

  "hc-black"

];
```

---

## fonts.js

```javascript
export const FONTS = [

  12,

  14,

  16,

  18,

  20,

  24

];
```

---

# Step 3

Create:

```text id="7hlv9t"
src/config/editorConfig.js
```

```javascript
export const editorConfig = {

  fontSize: 14,

  tabSize: 4,

  theme: "vs-dark",

  wordWrap: "on",

};
```

---

# Step 4

Create:

```text id="2w24pn"
src/templates/index.js
```

```javascript
export const templates = {

python:

`for i in range(5):
    print(i)`,

r:

`for(i in 1:5){

  print(i)

}`,

cpp:

`#include<iostream>

using namespace std;

int main(){

    cout<<"Hello World";

    return 0;

}`,

javascript:

`for(let i=0;i<5;i++){

    console.log(i);

}`

};
```

---

# Step 5

Create:

```text id="fd0ny5"
src/data/problems.js
```

```javascript
export const problems = [];
```

---

# Phase 2 Progress

```text id="3q9hzi"
✓ Zustand Editor Store

✓ Constants

✓ Editor Config

✓ Templates

✓ Empty Problem Data

--------------------------------

Next

LanguageSelector.jsx

ThemeSelector.jsx

FontSelector.jsx
```

---

### Your Task Now

Create these files:

```text id="7whhtv"
store/editor/editorStore.js

constants/languages.js

constants/themes.js

constants/fonts.js

config/editorConfig.js

templates/index.js

data/problems.js
```

and verify:

```text id="1xgh0j"
No compile errors.

npm run dev works.
```

When done, simply reply:

```text id="8u3mhr"
Next
```

and we will build the selector components.
