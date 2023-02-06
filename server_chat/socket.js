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

  // chat
  const chat = io.of("/chat");
  chat.on("connection", (socket) => {
    console.log("chat 입장 user : socket");

    socket.on("disconnect", () => {
      console.log("chat disconnect user : socket");
    });

    /**
     * data : room, roomBefore
     * 유저를 해당 방에 join시킨다.
     */
    socket.on("join_room", (data) => {
      if (data.roomBefore !== "") socket.leave(data.roomBefore);
      socket.join(data.room);
      console.log("user join ", data);
    });

    socket.on("send_msg", (data) => {
      chat.to(data.room).emit("receive_msg", {
        Id: data.Id,
        message: data.message,
        currentTime: data.currentTime,
      });
    });

    socket.on("check", (data) => {
      chat
        .to(data.room)
        .emit("getUserList", {
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
