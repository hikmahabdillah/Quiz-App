const ResultCard = ({ icon, total, typeContent }) => {
  let textColor = "";
  let borderColor = "";

  switch (typeContent) {
    case "True":
      textColor = "text-green-500";
      borderColor = "border-t-green-500";
      break;
      case "False":
        textColor = "text-red-500";
        borderColor = "border-t-red-500";
        break;
        case "Answers":
          textColor = "text-[#b488ff]";
          borderColor = "border-t-[#b488ff]";
          break;
          default:
            textColor = "text-slate-50";
            borderColor = "border-t-slate-50";
      break;
  }

  return (
    <div className="flex-1 flex flex-col">
      <h2 className="text-slate-50 font-semibold text-left mb-2">
        {typeContent}:
      </h2>
      <div className={`w-full p-3 rounded shadow border-t-4 max-w-[150px] sm:max-w-[200px] bg-gray-800 ${borderColor} text-center flex items-center justify-center gap-1 flex-1`}>
        {icon && <img className="size-7 sm:size-10" src={icon} alt="icon" />}
        <h1 className="font-semibold text-lg text-slate-50">
          <span className={textColor}>{total}</span>
        </h1>
      </div>
    </div>
  );
};

export default ResultCard;
