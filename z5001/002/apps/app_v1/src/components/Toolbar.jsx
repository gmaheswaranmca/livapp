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