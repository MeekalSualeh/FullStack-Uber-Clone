import { createContext, useState, useContext } from 'react'

const ChatContext = createContext()

const useChatContext = () => useContext(ChatContext)

const ChatContextProvider = ({ children }) => {

  const [chatData, setChatData] = useState({
    messages:[]
  })
  // const [chatData, setChatData] = useState({
  //   messages:[
  //     {
  //       _id:1,
  //       author: "123",
  //       content: "AOA, boss is number par call krna, 0123-456789",
  //       createdAt: "2025-11-08T23:12:45.123Z"
  //     },
  //     {
  //       _id:2,
  //       author: "123",
  //       content: "ok hogaya sir",
  //       createdAt: "2025-11-08T23:12:45.123Z"
  //     }
  //   ]
  // })

  return (
      <ChatContext.Provider value={{chatData, setChatData}}>
        { children }
      </ChatContext.Provider>
  )
}

export default ChatContextProvider

export {
  useChatContext
}