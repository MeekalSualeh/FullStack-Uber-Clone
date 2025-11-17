import { RiSendPlaneFill, RiSendPlane2Fill } from "@remixicon/react"

const MessageTypingField = ({ 
  placeholder, 
  value, 
  onChange,
  sendMessageHandler,
  isLoading=false
}) => {

  return (
    <>
        <input type="text" 
        placeholder={placeholder}
        className='bg-white w-88 h-15 rounded-lg border-1 border-slate-400 font-semibold text-xl text-slate-800 tracking-tight pl-4 pr-16 focus:ring-2 focus:ring-blue-400 box-border outline-none transition-ring duration-250 ease-out'
        value={value}
        onChange={onChange}
        />
    
        <button 
        className={`absolute right-3 h-15 w-13 flex justify-center items-center rounded-r-lg text-white ${isLoading ? "bg-slate-400" : "bg-slate-800 cursor-not-allowed"}`}
        onClick={() =>{ if(value) sendMessageHandler(value) }}
        >
            <RiSendPlaneFill />
        </button>
    </>
  )
}

export default MessageTypingField
