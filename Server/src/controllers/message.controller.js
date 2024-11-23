import { Message } from "../models/message.model.js";
import { Conversation } from "../models/conversation.model.js";
import { User } from "../models/user.model.js";

const sendMessage = async (req, res) => {
  try {
    const senderId = req.userId;
    const receiverId = req.params.id;
    const { message } = req.body;

    let gotConversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      gotConversation.messages.push(newMessage);
    }

    // Scoket io

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
      message: newMessage,
    });
  } catch (error) {}
};

const getMessage = async (req, res) => {
  try {
    const senderId = req.userId;
    const receiverId = req.params.id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("message");

    console.log("Conversation find btw users ",conversation);

    return res.status(200).json({success:true,message:"All message found successfully",messages:conversation})
    

  } catch (error) {
    console.log("Error occured while getting all the messages", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Error occured while getting all the messages",
        error,
      });
  }
};

export {sendMessage,getMessage}
