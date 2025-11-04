const SingleInfo = ({
    type,
    title,
    content,
    contentExtraClasses="",
    contentBigger=false,
    IconComponent,
    extraParentContainerClass=""
}) => {

  return (
    <div className={`bg-gray-200 w-full py-3 px-3 gap-x-4 mx-auto flex font-[helvetica] rounded-xl ${extraParentContainerClass}`}>
        <div className='w-5 text-slate-800 flex items-center justify-center'>
            <IconComponent />
        </div>

        <div className='flex-1 flex flex-col'>
            <h1 className={`text-black font-semibold ${title.length > 27 ? "text-md" : "text-lg"}`}>
                {title}
            </h1>

            <p className={`text-slate-500 ${contentBigger ? "text-md" : content.length < 60 ? "text-sm" : "text-xs"} ${contentExtraClasses}`}>
                {content}
            </p>
        </div>
    </div>
  )
}

export default SingleInfo
