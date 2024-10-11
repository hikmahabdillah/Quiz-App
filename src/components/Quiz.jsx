import { useEffect, useState } from "react";
import CurrentQuest from "./molecules/CurrentQuest";
import Question from "./molecules/Question";
import Timer from "./molecules/Timer";
import { getQuestions } from "../hooks/useQuestion";
import { useNavigate} from "react-router-dom";

const QuizForm = () => {
  const navigate = useNavigate();
  const listQuestions = getQuestions();
  const [startQuiz, setStartQuiz] = useState(false);
  const [isQuizEnd, setIsQuizEnd] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(1200); //20 minute

  useEffect(() => {
    // Cek apakah ada data kuis di localStorage
    const savedQuiz = JSON.parse(localStorage.getItem("quizData"));
    if (savedQuiz) {
      setQuestions(savedQuiz.questions);
      setCurrentQ(savedQuiz.currentQ);
      setAnswers(savedQuiz.answers);
      setTimeLeft(savedQuiz.timeLeft);
    } else {
      // jika belum ada, ambil data dari api
      setQuestions(listQuestions);
    }
  }, [listQuestions]);

  useEffect(() => {
    // jika questions sudah memiliki data, maka
    if (questions.length > 0) {
      localStorage.setItem(
        "quizData",
        JSON.stringify({ questions, currentQ, answers, timeLeft })
      );
    }
  }, [questions, currentQ, answers, timeLeft]);

  // jika waktu habis akan reset quiz(sementara)
  useEffect(() => {
    if (timeLeft === 0) {
      setIsQuizEnd(true);
    };
  }, [timeLeft]);

  // jika sudah mengerjakan sampai selesai maka akan langsung di redirect ke result
  useEffect(() => {
    const savedResult = JSON.parse(localStorage.getItem("quizResult"));

    if (savedResult) {
      setIsQuizEnd(true);
    };
  }, []);

  // jika quiz telah berakhir(waktu habis / semua soal telah selesai)
  useEffect(() => {
    if (isQuizEnd) 
      navigate("/result");
  }, [isQuizEnd, navigate]);

  // ketika user memilih jawaban
  const handleAnswer = (answer) => {
    // menyimpan jawaban yang dipilih
    setAnswers([...answers, answer]);

    // move to next quest
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setIsQuizEnd(true);
    }
  };

  return (
    <>
      {startQuiz ? (
        questions.length > 0 ? (
          <div className="w-full p-5 rounded-lg shadow border max-w-md sm:max-w-lg bg-gray-800 border-gray-700">
            <div className="flex items-center justify-between">
              <CurrentQuest currentQ={currentQ} totalQ={questions.length} />
              <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
            </div>
            <Question data={questions[currentQ]} handleAnswer={handleAnswer} isResult={false} />
          </div>
        ) : (
          <p className="text-slate-50 text-center font-semibold">Loading...</p>
        )
      ) : (!isQuizEnd && 
        <button
          type="button"
          onClick={() => setStartQuiz(!startQuiz)}
          className="custom-btn"
        >
          {!isQuizEnd && answers.length === 0 && "Start Quiz"}
          {!isQuizEnd && answers.length !== 0 && "Continue Quiz"}
        </button>
      )}
    </>
  );
};

export default QuizForm;
