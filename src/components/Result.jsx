import ResultCard from "./molecules/ResultCard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Result = () => {
  const navigate = useNavigate();
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [totalTrue, setTotalTrue] = useState();
  const [totalFalse, setTotalFalse] = useState();
  const [totalAnswers, setTotalAnswers] = useState();
  const [score, setScore] = useState();

  const clearLocalStorage = () => {
    localStorage.removeItem("quizData");
  };

  useEffect(() => {
    const savedQuiz = JSON.parse(localStorage.getItem("quizData"));
    if (savedQuiz) {
      // hitung jumlah jawaban
      const answers = savedQuiz.answers;
      setTotalAnswers(answers.length);

      // get correctAnswer dari semua soal
      const correctAnswer = savedQuiz.questions.map((item) => {
        return item.correct_answer;
      });
      setCorrectAnswers(correctAnswer);

      // menghitung jumlah benar
      const totalTrueAnswer = answers.filter((item) =>
        correctAnswers.includes(item)
      );
      setTotalTrue(totalTrueAnswer.length);

      // menghitung total salah
      let totalFalseAnswer = answers.length - totalTrueAnswer.length;
      setTotalFalse(totalFalseAnswer);

      // hitung skor
      let score = totalTrue * 5;
      setScore(score);
    }
  }, [correctAnswers, totalTrue]);

  return (
    <div className="w-full p-5 rounded-lg shadow border max-w-md sm:max-w-lg bg-gray-800 border-gray-700">
      {correctAnswers && (
        <>
          <h1 className="my-8 font-semibold text-center text-3xl text-slate-50">
            Score: <span className="text-yellow-500">{score} %</span>
          </h1>
          <div className="flex mb-3 justify-center gap-2 flex-wrap sm:flex-nowrap">
            <ResultCard
              icon={"../../check.svg"}
              total={totalTrue}
              typeContent="True"
            />
            <ResultCard
              icon={"../../close.svg"}
              total={totalFalse}
              typeContent="False"
            />
            <ResultCard icon={""} total={totalAnswers} typeContent="Answers" />
          </div>
        </>
      )}
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
