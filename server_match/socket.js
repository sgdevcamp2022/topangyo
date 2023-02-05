const socketIO = require("socket.io");
const allowedOrigins = require("./config/allowedOrigins");
const logger = require("./config/logger");
const data = require("./data");

module.exports = (server, app) => {
  const io = socketIO(server, {
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
    },
  });

  let currentRoomStatus = [];

  // chat
  const chat = io.of("/match");
  chat.on("connection", (socket) => {
    console.log("chat 입장 user : socket");

    socket.on("disconnect", () => {
      console.log("chat disconnect user : socket");
    });

    // data.room, data.Id
    socket.on("addUserIntoRoomStatus", (data) => {
      console.log(data);
    });
  });

  // end of code
};
