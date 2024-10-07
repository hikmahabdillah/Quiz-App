const Question = () => {
  return (
    <div className="mt-5 w-full p-3 sm:p-5 rounded-lg shadow border md:mt-0 max-w-md sm:max-w-lg bg-gray-700 border-gray-800">
      <h1 className="mb-5 font-semibold text-lg sm:text-xl text-slate-50">
        Apakah saya akan menjadi seorang Front End Developer di masa depan?
      </h1>
      <div className="w-full flex flex-col gap-3 mb-3">
        <div className="w-full flex items-center ps-4 bg-gray-800 border border-gray-200 rounded-lg dark:border-gray-800">
          <input
            id="bordered-radio-1"
            type="radio"
            value=""
            name="bordered-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="bordered-radio-1"
            className="w-full py-4 ms-2 text-sm sm:text-base font-medium text-gray-900 dark:text-gray-300"
          >
            Iya
          </label>
        </div>
      </div>
    </div>
  );
};

export default Question;
