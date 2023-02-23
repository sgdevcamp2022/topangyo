const socketIO = require("socket.io");
const allowedOrigins = require("./config/allowedOrigins");
const Matching = require("./models/Matching");
const logger = require("./config/logger");


module.exports = (server, app) => {
  const io = socketIO(server, {
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
    },
  });

  // chat
  const chat = io.of("/match");
  chat.on("connection", (socket) => {
    console.log("match 입장 user : socket");

    socket.on("disconnect", () => {
      console.log("chat disconnect user : socket");
    });

    // data.room, data.Id
    socket.on("addUserIntoRoomStatus", (data) => {
      
    });
  });

  // end of code
};
