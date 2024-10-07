const Timer = () => {
  return(
    <span className="flex items-center gap-1 bg-gray-700 rounded-lg  px-4 py-2 w-full max-w-max">
      <img src="../../timer.svg" alt="" className="w-[30px] sm:w-[35px]" width="35px"/>
      <p className="font-semibold text-[#b488ff] sm:text-lg">29:34</p>
    </span>
  )
}

export default Timer;