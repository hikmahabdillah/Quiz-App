import { useEffect, useState } from "react";
import Question from "./molecules/Question";

const Resume = () => {
  const [dataResume, setDataResume] = useState(null); // Initialize with null or an empty object

  useEffect(() => {
    // Retrieve the saved quiz data from localStorage once when the component mounts
    const savedQuiz = JSON.parse(localStorage.getItem("quizData"));
    if (savedQuiz) {
      setDataResume(savedQuiz);
    } // Log the saved quiz directly
  }, []); // Empty dependency array ensures this runs only once

  return (
    <>
      <h1 className="text-3xl text-slate-50 font-semibold mt-5">Resume</h1>
      <p className="mb-5 font-medium text-sm sm:text-base text-gray-400">Description: if the answer you choosed is wrong, there will be a display for the correct choice (green answer choice).</p>
      {dataResume && dataResume.questions && dataResume.questions.length > 0 ? (
        dataResume.questions.map((question, index) => (
          <Question key={index} data={question} isResult={true} answerResult={dataResume.answers[index]} />
        ))
      ) : (
        <div className="text-slate-50 text-center">
          No questions available.
        </div>
      )}
    </>
  );
}

export default Resume;