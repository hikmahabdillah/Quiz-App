import { useEffect, useState } from "react";
import CurrentQuest from "./molecules/CurrentQuest";
import Question from "./molecules/Question";
import Timer from "./molecules/Timer";
import { getQuestions } from "../hooks/useQuestion";

const QuizForm = () => {
  const listQuestions = getQuestions();
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(1200); //20 minute

  useEffect(() => {
    // Cek apakah ada data kuis di localStorage
    const savedQuiz = JSON.parse(localStorage.getItem('quizData'));
    if(savedQuiz){
      setQuestions(savedQuiz.questions);
      setCurrentQ(savedQuiz.currentQ);
      setAnswers(savedQuiz.answers);
      setTimeLeft(savedQuiz.timeLeft);
    } else {
      // jika belum ada, ambil data dari api
      setQuestions(listQuestions)
    }
  }, [listQuestions]);

  useEffect(() => {
    // jika questions memiliki data, maka
    if (questions.length > 0) {
      localStorage.setItem(
        "quizData",
        JSON.stringify({ questions, currentQ, answers, timeLeft })
      );
    }
  }, [questions, currentQ, answers, timeLeft]);

  return (
    <>
      <header>
        <a
          href="https://github.com/hikmahabdillah/Quiz-App"
          className="flex items-center mb-6 text-2xl font-semibold text-white"
        >
          <img className="size-14 mr-2" src="../Logo.png" alt="logo" />
          QuizzThink
        </a>
      </header>
      <div className="w-full p-5 rounded-lg shadow border max-w-md sm:max-w-lg bg-gray-800 border-gray-700">
        <div className="flex items-center justify-between">
          <CurrentQuest currentQ={currentQ} totalQ={questions.length}/>
          <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft}/>
        </div>
        <Question/>
      </div>
    </>
  );
};

export default QuizForm;
