import useGetMessages from '../hooks/useGetMessages'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import {motion} from "framer-motion"
import { useRef , useEffect} from 'react'
import { useSelector } from 'react-redux'

const AllMessages = () => {
    const scrollAreaRef = useRef()

    const {messages} = useSelector((state)=>state.messageReducer)
    useGetMessages()
    

    useEffect(() => {
        if (scrollAreaRef.current) {
          scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
      }, [messages]);

  return (
    <>
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          {messages?.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className={`flex ${
                message?.sender === "user" ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message?.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p>{message?.content}</p>
                <p className="text-xs mt-1 opacity-70">{message?.timestamp}</p>
              </div>
            </motion.div>
          ))}
        </ScrollArea>
    </>
  )
}

export default AllMessages
