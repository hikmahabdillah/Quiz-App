import ResultCard from "./molecules/ResultCard";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const navigate = useNavigate();

  const clearLocalStorage = () => {
    localStorage.removeItem("quizData");
  };

  return (
    <div className="w-full p-5 rounded-lg shadow border max-w-md sm:max-w-lg bg-gray-800 border-gray-700">
      <h1 className="my-8 font-semibold text-center text-3xl text-slate-50">
        Score: <span className="text-yellow-500">90%</span>
      </h1>
      <div className="flex mb-3 justify-center gap-2 flex-wrap sm:flex-nowrap">
        <ResultCard icon={"../../check.svg"} total={18} typeContent="True" />
        <ResultCard icon={"../../close.svg"} total={2} typeContent="False" />
        <ResultCard icon={""} total={20} typeContent="Answers" />
      </div>
      <button
        type="button"
        onClick={() => {
          clearLocalStorage();
          navigate("/");
        }}
        className="custom-btn block mx-auto mt-8"
      >
        Reset Quiz
      </button>
    </div>
  );
};

export default Result;
