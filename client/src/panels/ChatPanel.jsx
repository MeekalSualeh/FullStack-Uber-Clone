import { useCallback, useEffect, useRef, useState } from "react"
import { useCaptainContext } from "../contexts/CaptainContextProvider"
import { useUserContext } from "../contexts/UserContextProvider"
import { useAuthContext } from "../contexts/AuthContextProvider"
import { useRideContext } from "../contexts/RideContextProvider"
import { useChatContext } from "../contexts/ChatContextProvider"
import { useSocketContext } from "../contexts/SocketContextProvider"
import Message from "../components/Message"
import MessageTypingField from "../components/MessageTypingField"


const ChatPanel = () => {

  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { role } = useAuthContext()
  const { userData } = useUserContext()
  const { captainData } = useCaptainContext()
  const { socket } = useSocketContext()
  const { chatData } = useChatContext()
  const { rideData } = useRideContext()

  const sendMessageHandler = useCallback((content) =>{
    socket?.current?.emit("message-from-frontend", {content, rideId: rideData._id.toString()})

    setMessage("")
  },[socket?.current])

  const chatRef = useRef(null)

  useEffect(() =>{

    if(!chatRef?.current) return;

    chatRef.current.scrollTop = chatRef.current.scrollHeight

  }, [chatRef?.current, chatData?.messages, chatData])

  return (
    <>

    <h1 className="mx-7 mt-1 text-xl font-semibold text-orange-600">

      {role === "user"?  `${captainData?.firstname} ${captainData?.lastname || ""}` : `${userData?.firstname} ${userData?.lastName || ""}`} 

    </h1>

    {isLoading && <div className="text-center text-xl font-semibold mt-25"
    >Loading Chats ...</div>}
    
    {!isLoading && (
    <div 
    ref={chatRef}
    className="mx-3 pb-4 h-[460px] flex flex-col flex-shrink-0 mt-4 gap-y-6 overflow-y-auto overflow-x-hidden no-scrollbar">

      {chatData?.messages?.map(({ 
        _id, 
      author, 
      content, 
      createdAt 
      }) =>(

        <Message 
        key={_id}
        content={content}
        createdAt={createdAt}
        isItMyMessage={role === "user" ? author === userData._id : author === captainData._id}
        />

      ) )}

    </div>
    )}

    <div className="bg-gray-200 h-[15%] w-screen flex justify-center items-center absolute bottom-0">
      <MessageTypingField 
      placeholder="Type Message"
      value={message} 
      onChange={(e) => setMessage(e.target.value)}
      sendMessageHandler={sendMessageHandler}
      isLoading={isLoading}
      />
    </div>

    </>    
  )
}

export default ChatPanel
