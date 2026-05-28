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