import ResultCard from "./molecules/ResultCard";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Resume from "./Resume";
import { AuthContext } from "../context/AuthContext";

const Result = () => {
  const navigate = useNavigate();
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [totalTrue, setTotalTrue] = useState(0);
  const [totalFalse, setTotalFalse] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [score, setScore] = useState(0);
  const { isAuthenticated, logout } = useContext(AuthContext);

  const clearLocalStorage = () => {
    localStorage.removeItem("quizData");
    localStorage.removeItem("quizResult");
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const savedQuiz = JSON.parse(localStorage.getItem("quizData"));
    if (savedQuiz) {
      // Hitung jumlah jawaban
      const answers = savedQuiz.answers || [];
      const answersCount = answers.length;
      setTotalAnswers(answersCount);

      // Get correctAnswer dari semua soal
      const correctAnswer = savedQuiz.questions.map(
        (item) => item.correct_answer
      );
      setCorrectAnswers(correctAnswer);

      // Menghitung jumlah benar
      const totalTrueAnswer = answers.filter((item) =>
        correctAnswer.includes(item)
      );
      const totalTrueCount = totalTrueAnswer.length;
      setTotalTrue(totalTrueCount);

      // Menghitung total salah
      const totalFalseCount = answersCount - totalTrueCount;
      setTotalFalse(totalFalseCount);

      // Hitung skor
      const calculatedScore =
        answersCount > 0 ? (totalTrueCount / answersCount) * 100 : 0;
      setScore(calculatedScore);

      // Simpan state ke local storage
      const resultData = {
        correctAnswers: correctAnswer,
        totalTrue: totalTrueCount,
        totalFalse: totalFalseCount,
        totalAnswers: answersCount,
        score: calculatedScore,
      };
      localStorage.setItem("quizResult", JSON.stringify(resultData));
    }
  }, []);

  // Optional: Load saved result from local storage on component mount
  useEffect(() => {
    const savedResult = JSON.parse(localStorage.getItem("quizResult"));
    if (savedResult) {
      setCorrectAnswers(savedResult.correctAnswers);
      setTotalTrue(savedResult.totalTrue);
      setTotalFalse(savedResult.totalFalse);
      setTotalAnswers(savedResult.totalAnswers);
      setScore(savedResult.score);
    }
  }, []);

  return (
    <>
      <button type="button" onClick={() => logout()} className="fixed top-5 right-5 custom-btn">
        Logout
      </button>
      <div className="w-full p-5 rounded-lg shadow border max-w-md sm:max-w-lg bg-gray-800 border-gray-700">
        {correctAnswers.length > 0 && (
          <>
            <h1 className="my-8 font-semibold text-center text-3xl text-slate-50">
              Score: <span className="text-yellow-500">{score.toFixed(0)}%</span>
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
              <ResultCard
                icon={""}
                total={totalAnswers}
                typeContent="Answers"
              />
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
        <Resume />
      </div>
    </>
  );
};

export default Result;
