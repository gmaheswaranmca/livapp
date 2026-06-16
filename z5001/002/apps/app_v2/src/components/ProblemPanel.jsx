function ProblemPanel({ problem }) {
  return (
    <div className="
      w-[35%]
      border-r
      border-gray-700
      p-5
      overflow-y-auto
      bg-[#1e1e1e]
      text-white
    ">
      <h2 className="
        text-2xl
        font-bold
        mb-5
      ">
        {problem.title}
      </h2>

      <pre className="
        whitespace-pre-wrap
        leading-7
        text-sm
      ">
        {problem.statement}
      </pre>
    </div>
  );
}

export default ProblemPanel;