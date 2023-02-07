const { Schema, model } = require("mongoose");
const { ChatSchema } = require("../models/Chat");

const ChatRoomSchema = new Schema(
  {
    room: {
      type: String,
    },
    host: {
      type: String,
    },
    chat: [ChatSchema],
  },
  {
    timestamps: true,
  }
);

const ChatRoom = model("chatroom", ChatRoomSchema);
module.exports = ChatRoom;

