const socketIO = require("socket.io");
const allowedOrigins = require("./config/allowedOrigins");
const { Chat } = require("./models/Chat");
const ChatRoom = require("./models/ChatRoom");

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

    socket.on("join_room", (data) => {
      if (data.roomBefore !== "") socket.leave(data.roomBefore);
      socket.join(data.room);
      console.log("user join ", data);
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
        if (prevChatHistory !== null) {
          chat
            .to(socket.id)
            .emit("chatList", { chatList: prevChatHistory.chat });
        }
      } catch (error) {
        console.error(error);
      }
    });

    socket.on("check", (data) => {
      chat.to(data.room).emit("getUserList", {
        list: Array.from(socket.adapter.rooms.get(data.room)),
      });
    });

    socket.on("test", (data) => {
      socket.emit("addUserIntoRoomStatus", {
        id: "user1",
      });
    });
  });

  // end of code
};
