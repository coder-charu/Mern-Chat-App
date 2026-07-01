import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    // this is my id --> logged in user's id
    const loggedInUserId = req.user._id;
    // these are all users who are present in db
    const filteredUsers = await User.find({
      // get all users id present in db but not the logged in one
      _id: { $ne: loggedInUserId },
    }).select("-password");

    return res.status(201).json(filteredUsers);
  } catch (error) {
    // for developers
    console.log("Error in getUsersForSidebar controller:", error.message);
    // for user interface --> toast message
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    return res.status(200).json(messages);
  } catch (error) {
    // for developers
    console.log("Error in getMessages controller:", error.message);
    // for user interface --> toast message
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId: myId,
      receiverId: userToChatId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    // Realtime chat fn goes below --> socket.io

    return res.status(200).json(newMessage);
  } catch (error) {
    // for developers
    console.log("Error in sendMessage controller:", error.message);
    // for user interface --> toast message
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
