import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/slices/messageSlice";

const ChatInputBox = () => {
  const [input, setInput] = useState<String>();
  const { token, selectedUserForChat } = useSelector(
    (state) => state.userReducer
  );
  const {messages} = useSelector((state)=>state.messageReducer)
  const disptach = useDispatch()

  const handleSendMessage = async (e) => {
    e.preventDefualt();
    try {
      const response = await axios.post(
        `http://localhost:7878/api/v1/send-message/${selectedUserForChat._id}`,
        { message:input },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(response.data.success){
         console.log(response);
         disptach(setMessages([...messages,response?.data?.newMessage]))
         setInput("")
      }
      console.log(response);
    } catch (error) {
      console.log("Error while sending message");
    }
  };

  return (
    <>
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Type a message..."
            className="flex-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" size="icon">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </>
  );
};

export default ChatInputBox;
