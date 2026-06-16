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