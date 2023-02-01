const socketIO = require("socket.io");
const allowedOrigins = require("./config/allowedOrigins");

module.exports = (server, app) => {
  const socket = socketIO(server, {
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
    },
  });
  // app.set("chat", socket);
  socket.on("connection", (socket) => {
    console.log("클라이언트와 socket 연결되었습니다.");
    console.log("socket체크", socket);
  });
};
