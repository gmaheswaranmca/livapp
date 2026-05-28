import Editor from "@monaco-editor/react";

function CodeEditor({ code, setCode }) {
  return (
    <div className="h-screen">
      <Editor
        height="100%"
        language="python"
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