const Message = ({
  isItMyMessage=false,
  author,
  content,
  createdAt
}) => {
  
  const date = new Date(createdAt).toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "numeric",
    year: "numeric"
  })

  return ( 

    <div className={`w-[92%] flex flex-col px-5 pt-4 pb-4 font-[helvetica] gap-y-6 rounded-2xl relative ${isItMyMessage ? " bg-blue-500 text-white rounded-br-none self-end" : "bg-gray-300 text-slate-800 rounded-bl-none"}`}>
    
        <div className={`h-2 w-2 absolute -bottom-1 transform rounded-b-xl ${isItMyMessage ? "bg-blue-500 right-0" : "bg-gray-300 left-0"} `}>
        </div>

        <p
        className=" text-xl"
        >{content}</p>

        <p
        className={`text-sm tracking-widest italic ${isItMyMessage ? "text-gray-300" : "text-slate-500"}`}
        >{date}</p>

    </div>
  )
}

export default Message
