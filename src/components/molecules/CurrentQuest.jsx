const CurrentQuest = ({currentQ, totalQ}) => {
  return(
    <span className="flex items-center gap-1 px-3 py-1 flex-wrap">
      Question
      <p className="font-semibold text-[#b488ff]">{currentQ + 1} / <span className="text-slate-50">{totalQ}</span></p>
    </span>
  )
}

export default CurrentQuest;