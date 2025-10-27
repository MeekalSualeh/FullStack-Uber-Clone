import { createContext, useState, useContext } from 'react'

const ChatContext = createContext()

export const useChatContext = () => useContext(ChatContext)

const ChatContextProvider = ({ children }) => {

  const [chatData, setChatData] = useState(null)

  return (
      <ChatContext.Provider value = {{chatData, setChatData}}>
        { children }
      </ChatContext.Provider>
  )
}

export default ChatContextProvider