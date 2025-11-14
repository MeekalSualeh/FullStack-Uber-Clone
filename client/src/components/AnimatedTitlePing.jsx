const AnimatedTitlePing = ({
  title, 
  steadyColor, 
  blinkingColor

}) => {

  return (
    <div className='w-full flex flex-col relative items-center'>

      <h1 className="text-slate-700 text-xl font-semibold ">
        {title}
      </h1>

      <span className={`size-[14px] rounded-full absolute self-end opacity-90 ${steadyColor}`}>
      </span>

      <span className={`size-[14px] rounded-full animate-ping opacity-80 absolute self-end ${blinkingColor}`}>
      </span>
    </div>
  )
}

export default AnimatedTitlePing
