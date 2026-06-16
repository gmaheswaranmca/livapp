import { useState, useEffect } from "react";
import { loadPyodide } from "pyodide";
import { FaPython } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function AppPythonEditor() {
  const [pyodide, setPyodide] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);

  const [code, setCode] = useState(
`for i in range(5):
    print(i)`
  );

  const [output, setOutput] = useState("Loading Python...");

  useEffect(() => {
    async function init() {
      try {
        const py = await loadPyodide();

        setPyodide(py);
        setOutput("Python Ready");
      } catch (err) {
        setOutput("Failed to load Python:\n" + err);
      }
    }

    init();
  }, []);

  const runCode = async () => {
    if (!pyodide) return;

    setIsRunning(true);
    setOutput("");

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
    } finally {
      setIsRunning(false);
    }
  };

  const restartKernel = () => {
    const confirmRestart = window.confirm(
      "Restart Python kernel?\n\nAll variables, functions and imports will be lost."
    );

    if (!confirmRestart) return;

    setIsRestarting(true);

    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl rounded-xl bg-white p-6 shadow-lg">

        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <FaPython className="text-5xl text-blue-600" />

          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Python Runner
            </h2>

            <p className="text-sm text-gray-500">
              Run Python code directly in your browser
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="mb-4 flex flex-wrap gap-3">

          <button
            onClick={runCode}
            disabled={!pyodide || isRunning || isRestarting}
            className="
              rounded-lg
              bg-blue-600
              px-6
              py-3
              font-medium
              text-white
              transition
              hover:bg-blue-700
              disabled:cursor-not-allowed
              disabled:bg-gray-400
            "
          >
            {isRunning ? (
              <span className="flex items-center gap-2">
                <AiOutlineLoading3Quarters className="animate-spin" />
                Running...
              </span>
            ) : (
              "Run Code"
            )}
          </button>

          <button
            onClick={restartKernel}
            disabled={isRunning || isRestarting}
            className="
              rounded-lg
              bg-orange-600
              px-6
              py-3
              font-medium
              text-white
              transition
              hover:bg-orange-700
              disabled:cursor-not-allowed
              disabled:bg-gray-400
            "
          >
            {isRestarting ? (
              <span className="flex items-center gap-2">
                <AiOutlineLoading3Quarters className="animate-spin" />
                Restarting...
              </span>
            ) : (
              "Kernel: Python Restart"
            )}
          </button>
        </div>

        {/* Editor */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Python Code
          </label>

          <textarea
            rows={15}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="
              w-full
              rounded-lg
              border
              border-gray-300
              bg-gray-50
              p-4
              font-mono
              text-sm
              focus:border-blue-500
              focus:outline-none
              focus:ring-2
              focus:ring-blue-200
            "
          />
        </div>

        {/* Output */}
        <div>
          <h3 className="mb-3 text-xl font-semibold text-gray-800">
            Output
          </h3>

          <div
            className="
              min-h-[220px]
              overflow-auto
              rounded-lg
              bg-gray-900
              p-4
              font-mono
              text-sm
              text-green-400
            "
          >
            {isRunning ? (
              <div className="flex items-center gap-3 text-yellow-400">
                <AiOutlineLoading3Quarters
                  className="animate-spin text-2xl"
                />
                <span>Running...</span>
              </div>
            ) : (
              <pre className="whitespace-pre-wrap">
                {output}
              </pre>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default AppPythonEditor;