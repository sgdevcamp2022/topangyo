const { Schema, model } = require("mongoose");

const ChatSchema = new Schema(
  {
    Id: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Chat = model("chat", ChatSchema);
module.exports = { Chat, ChatSchema };
