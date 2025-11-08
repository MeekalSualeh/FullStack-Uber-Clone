import { createContext, useState, useContext } from 'react'

const ChatContext = createContext()

const useChatContext = () => useContext(ChatContext)

const ChatContextProvider = ({ children }) => {

  const [chatData, setChatData] = useState({
    messages:[
      {
        _id:1,
        author: "123",
        content: "AOA, boss is number par call krna, 0123-456789",
        createdAt: "2025-11-08T23:12:45.123Z"
      },
      {
        _id:2,
        author: "123",
        content: "ok hogaya sir",
        createdAt: "2025-11-08T23:12:45.123Z"
      },
      {
        _id:3,
        author: "123",
        content: "Ustaad Ji kidhar h aap",
        createdAt: "2025-11-08T23:20:25.123Z"
      },
      {
        _id:4,
        author: "123",
        content: "wait kar rha mein",
        createdAt: "2025-11-08T23:21:00.123Z"
      },
      {
        _id:5,
        author: "456",
        content: "bas agaya petrol dalwa rha",
        createdAt: "2025-11-08T23:22:22.123Z"
      },
      {
        _id:6,
        author: "456",
        content: "5 min bas agaya",
        createdAt: "2025-11-08T23:22:45.123Z"
      },
      {
        _id:7,
        author: "123",
        content: "Settay",
        createdAt: "2025-11-08T23:23:45.123Z"
      },
      {
        _id:8,
        author: "456",
        content: "M pickup par agaya hun, wait kar rha neechay",
        createdAt: "2025-11-08T23:23:45.123Z"
      },
    ]
  })

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