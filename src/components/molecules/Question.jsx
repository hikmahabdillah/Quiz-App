/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const Question = ({ data, handleAnswer, isResult, answerResult }) => {
  // Check ketersediaan data
  if (!data) {
    return (
      <div className="my-5 text-slate-50 text-center font-semibold">
        Loading...
      </div>
    );
  }

  // untuk mengubah format soal agar mudah terbaca(menghilangkan kode html entity)
  const decodeHTML = (str) => {
    const parser = new DOMParser().parseFromString(str, "text/html");
    return parser.documentElement.textContent;
  };
  const decodeQuestion = decodeHTML(data.question);

  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);

  // untuk menggabungkan semua jawaban dan mengacak jawaban tersebut
  useEffect(() => {
    const allAnswers = [data.correct_answer, ...data.incorrect_answers];
    const shuffleAnswers = allAnswers.sort(() => Math.random() - 0.5);
    setAnswers(shuffleAnswers);

    // Reset jawaban yang dipilih saat soal berubah
    setSelectedAnswer(null);
    setIsAnswerSelected(false);
  }, [data]);

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
    setIsAnswerSelected(true);

    setTimeout(() => {
      handleAnswer(answer);
    }, 1500);
  };

  const getAnswerClass = (answer) => {
    // posisi default
    if (!isAnswerSelected && !isResult) return "bg-gray-800"; 
    
    // jika kuis sudah selesai
    if (isResult) {
      if (answer === data.correct_answer) return "bg-green-500"; //correct Answer
      if (answer !== data.correct_answer && answerResult===answer) return "bg-red-400"; 
      return "bg-gray-800"; 
    }else{
      if (answer === selectedAnswer) {
        if (selectedAnswer === data.correct_answer) return "bg-green-500"; // Correct answer
        return "bg-red-400"; // Selected wrong answer
      }
      return "bg-gray-800";
    }
  };

  return (  
    <div className="mt-5 w-full p-3 sm:p-5 rounded-lg shadow border max-w-md sm:max-w-lg bg-gray-700 border-gray-800">
      <h1 className="mb-5 font-semibold text-lg sm:text-xl text-slate-50">
        {data && decodeQuestion}
      </h1>
      <div className="w-full flex flex-col gap-3 mb-3">
        {answers.map((answer, index) => (
          <InputChoice
            key={index}
            order={index}
            answer={answer}
            isResult={isResult}
            answerClass={getAnswerClass(answer)}
            handleSelectAnswer={handleSelectAnswer}
            selectedAnswer={selectedAnswer}
            isAnswerSelected={isAnswerSelected}
          />
        ))}
      </div>
    </div>
  );
};

const InputChoice = ({
  order,
  answer,
  handleSelectAnswer,
  selectedAnswer,
  answerClass,
  isAnswerSelected,
  isResult
}) => {
  return (
    <>
      <div
        className={`w-full flex items-center ps-4
          ${answerClass}
         border rounded-lg border-gray-800 duration-300`}
      >
        <input
          id={order}
          type="radio"
          onChange={() => handleSelectAnswer(answer)}
          value={answer}
          name="bordered-radio"
          className="size-5 text-blue-600focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
          checked={selectedAnswer === answer}
          disabled={isAnswerSelected || isResult}
        />
        <label
          htmlFor={order}
          className="w-full py-4 ms-2 text-sm sm:text-base font-medium text-gray-300"
        >
          {answer}
        </label>
      </div>
    </>
  );
};

export default Question;
