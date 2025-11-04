const Suggestion = ({mainText, secondaryText, onClick}) => {
  return (
    <div
    onClick={onClick}
    className='bg-gray-200 hover:bg-gray-600 w-[90%] py-4 px-3 cursor-pointer rounded-xl ring-1 ring-gray-400'>
        
        <h1 className={`${mainText.length > 20 ? "text-md" : "text-lg"} font-semibold text-slate-800 mb-1`}>
          {mainText}
        </h1>
        <p className='text-md tracking-tight text-slate-600'>
            {secondaryText}
        </p>
      
    </div>
  )
}

export default Suggestion
