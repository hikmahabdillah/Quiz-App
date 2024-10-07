import CurrentQuest from "./molecules/CurrentQuest";
import Question from "./molecules/Question";
import Timer from "./molecules/Timer";

const QuizForm = () => {
  return (
    <>
      <header>
        <a
          href="https://github.com/hikmahabdillah/Quiz-App"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="size-14 mr-2" src="../Logo.png" alt="logo" />
          QuizzThink
        </a>
      </header>
      <div className="w-full bg-slate-50 p-5 rounded-lg shadow dark:border md:mt-0 max-w-md sm:max-w-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <CurrentQuest/>
          <Timer />
        </div>
        <Question/>
      </div>
    </>
  );
};

export default QuizForm;
