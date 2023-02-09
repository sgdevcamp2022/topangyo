const socketIO = require("socket.io");
const allowedOrigins = require("./config/allowedOrigins");
const { Chat } = require("./models/Chat");
const ChatRoom = require("./models/ChatRoom");
const Matching = require("./models/Matching");

module.exports = (server, app) => {
  const io = socketIO(server, {
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
    },
  });

  // chat
  const chat = io.of("/chat");
  chat.on("connection", (socket) => {
    console.log("chat 입장 user : socket");

    socket.on("disconnect", () => {
      console.log("chat disconnect user : socket");
    });

    socket.on("join_room", async (data) => {
      try {
        socket.join(data.room);
        const result = await Matching.updateOne(
          { room: data.room },
          { $addToSet: { chatUser: { $each: [data.id] } } }
        );
      } catch (error) {}
    });

    socket.on("leave_room", async (data) => {
      try {
        socket.leave(data.room);
        const result = await Matching.updateOne(
          { room: data.room },
          { $pull: { chatUser: { $eq: `${data.id}` } } }
        );
      } catch (error) {}
    });

    socket.on("send_msg", async (data) => {
      try {
        let chatMsg = new Chat({
          Id: data.Id,
          message: data.message,
        });
        await Promise.all([
          chatMsg.save(),
          ChatRoom.updateOne(
            { room: data.room },
            { $push: { chat: { $each: [chatMsg] } } }
          ),
        ]);

        chat.to(data.room).emit("receive_msg", {
          Id: data.Id,
          message: data.message,
          currentTime: data.currentTime,
        });
      } catch (error) {
        console.error(error);
      }
    });

    socket.on("getPreviousChatHistory", async (data) => {
      try {
        const prevChatHistory = await ChatRoom.findOne({ room: data.room });
        if (prevChatHistory !== null)
          chat
            .to(socket.id)
            .emit("chatList", { chatList: prevChatHistory.chat });
      } catch (error) {
        console.error(error);
      }
    });

    socket.on("checkRoom", async (data) => {
      const userList = await Matching.findOne(
        { room: data.room },
        { chatUser: 1, _id: 0 }
      );
      if (userList) {
        chat.to(data.room).emit("getUserList", {
          userList: userList.chatUser,
        });
      }
      console.log(socket.adapter.rooms);
    });
  });

  // end of code
};
