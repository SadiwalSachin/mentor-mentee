import * as React from "react";
import { motion } from "framer-motion";
import { Send, MoreVertical, Phone, Video, ArrowLeft } from "lucide-react";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { ScrollArea } from "../components/ui/scroll-area";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetMessages from "../hooks/useGetMessages";
import axios from "axios";
import ChatInputBox from "./ChatInputBox";
import AllMessages from "./AllMessages";

interface Message {
  id: string;
  content: string;
  sender: "user" | "other";
  timestamp: string;
}

interface ChatDetailProps {
  user: {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
  };
  onBack: () => void;
}

const messages: Message[] = [
  {
    id: "1",
    content: "Hey, how's it going?",
    sender: "other",
    timestamp: "10:00 AM",
  },
  {
    id: "2",
    content: "I'm doing well, thanks! How about you?",
    sender: "user",
    timestamp: "10:02 AM",
  },
  {
    id: "3",
    content:
      "Pretty good! I wanted to ask you about the project we discussed last week.",
    sender: "other",
    timestamp: "10:05 AM",
  },
  {
    id: "4",
    content: "Sure, what would you like to know?",
    sender: "user",
    timestamp: "10:07 AM",
  },
  {
    id: "5",
    content: "I was wondering if you've made any progress on the design phase?",
    sender: "other",
    timestamp: "10:10 AM",
  },
  {
    id: "6",
    content:
      "Yes, I've completed the initial wireframes. Would you like me to send them over?",
    sender: "user",
    timestamp: "10:12 AM",
  },
  {
    id: "7",
    content:
      "That would be great! I'm excited to see what you've come up with.",
    sender: "other",
    timestamp: "10:15 AM",
  },
  {
    id: "8",
    content: "Alright, I'll prepare them and send them to you shortly.",
    sender: "user",
    timestamp: "10:17 AM",
  },
  {
    id: "9",
    content:
      "Perfect, thanks! Let's schedule a call to discuss them once I've had a chance to review.",
    sender: "other",
    timestamp: "10:20 AM",
  },
  {
    id: "10",
    content: "Sounds good to me. How about tomorrow afternoon?",
    sender: "user",
    timestamp: "10:22 AM",
  },
];

export function ChatDetailComponent() {
  // selcted user ki details show karni hai main chat wale section me uper
  const { selectedUserForChat } = useSelector((state) => state.userReducer);
  const user = selectedUserForChat;

  const navigate = useNavigate();

  return (
    <div className="flex-1 md:ml-64">
      <div className="flex flex-col h-[90vh] bg-background">
        <div className="flex items-center gap-4 p-4 border-b">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className=""
          >
            <ArrowLeft className="h-10 w-10" />
          </Button>
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.avatar} alt={user.name} />
            <AvatarFallback>
              {user?.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="font-semibold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">
              {user.isOnline ? "Online" : "Offline"}
            </p>
          </div>
          <Button variant="ghost" size="icon">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>


        {/* yaha par useGetMessages hook se jo message aayega usko map karna hai */}
        {/* <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p>{message.content}</p>
                <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
              </div>
            </motion.div>
          ))}
        </ScrollArea> */}


        <AllMessages/>
        // input field for Sending message


        {/* <form onSubmit={handleSendMessage} className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </form> */}
        <ChatInputBox/>
      </div>
    </div>
  );
}
