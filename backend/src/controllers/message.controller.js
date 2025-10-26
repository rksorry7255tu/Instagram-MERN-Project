import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;

    let conversation = await Conversation.findOne({
      participants: [senderId, receiverId],
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    conversation = await Conversation.findByIdAndUpdate(
      { _id: conversation?._id },
      { $push: { messages: newMessage?._id } }
    );
    if (!conversation) {
      return res.status(401).json({
        success: false,
        message: "Message not sended",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Message sended successfully",
      newMessage,
    });
  } catch (error) {
    console.log(error);
  }
};

const getMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req?.params?.id;

    const conversation = await Conversation.findOne({
      participants: [senderId, receiverId],
    }).populate("messages");
    if (!conversation) {
      return res.status(401).json({
        success: false,
        message: "conversation not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: conversation?.messages,
    });
  } catch (error) {
    console.log(error);
  }
};

export { sendMessage, getMessage };
