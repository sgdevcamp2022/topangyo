const socketIO = require("socket.io");
const allowedOrigins = require("./config/allowedOrigins");
const logger = require("./config/logger");

module.exports = (server, app) => {
  const io = socketIO(server, {
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
    },
  });

  let currentRoomStatus = [];


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

    socket.on("send_msg", (data) => {
      console.log(data);
      chat.to(data.room).emit("receive_msg", {
        username: data.username,
        message: data.message,
      });
    });

    socket.on("check", (data) => {
      console.log(socket.adapter.rooms);
    });
  });

  // end of code
};
