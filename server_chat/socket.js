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

    socket.on("getChatUser", async (data) => {
      const userList = await Matching.findOne(
        { room: data.room },
        { chatUser: 1, _id: 0 }
      );
      if (userList) {
        chat.to(data.room).emit("getChatUserList", {
          chatUser: userList.chatUser,
        });
      }
    });

    socket.on("getApplyAndMatchedUser", async (data) => {
      try {
        const userList = await Matching.findOne({ room: data.room });
        // if (userList.host === data.id) {
        chat.to(data.room).emit("getApplyAndMatchedUserList", {
          applyUser: userList.applyUser,
          matchedMembers: userList.members,
        });
        // }
      } catch (error) {
        console.error(error);
      }
    });

    socket.on("applyment", async (data) => {
      try {
        // 가능하다면 추후에 방장인 경우 검증하기
        // 신청을 이미 했는지 검증하기
        const applyList = await Matching.findOneAndUpdate(
          { room: data.room },
          { $addToSet: { applyUser: { $each: [data.id] } } },
          { new: true }
        );
        chat.to(data.room).emit("getApplyAndMatchedUserList", {
          applyUser: applyList.applyUser,
          matchedMembers: applyList.members,
        });
      } catch (error) {
        console.error(error);
      }
    });

    //신청 수락
    socket.on("acceptApplyUser", async (data) => {
      const acceptUserToMembers = await Matching.findOneAndUpdate(
        { room: data.room },
        {
          $pull: { applyUser: { $eq: `${data.id}` } },
          $addToSet: { members: { $each: [data.id] } },
        },
        { new: true }
      );
      chat.to(data.room).emit("getApplyAndMatchedUserList", {
        applyUser: acceptUserToMembers.applyUser,
        matchedMembers: acceptUserToMembers.members,
      });
    });

    // 신청 거절
    socket.on("declineApplyUser", async (data) => {
      const declineApplyUser = await Matching.findOneAndUpdate(
        { room: data.room },
        { $pull: { applyUser: { $eq: `${data.id}` } } },
        { new: true }
      );
      chat.to(data.room).emit("getApplyAndMatchedUserList", {
        applyUser: declineApplyUser.applyUser,
        matchedMembers: declineApplyUser.members,
      });
    });

    socket.on("cancleApplyment", async (data) => {
      const cancleApply = await Matching.findOneAndUpdate(
        { room: data.room },
        { $pull: { applyUser: { $eq: `${data.id}` } } },
        { new: true }
      );
      chat.to(data.room).emit("getApplyAndMatchedUserList", {
        applyUser: cancleApply.applyUser,
        matchedMembers: cancleApply.members,
      });
    });

    socket.on("cancleMatcing", async (data) => {
      const cancleMatching = await Matching.findOne({ room: data.room });
      // if (cancleMatching.host !== data.id) {
      const filterdMatchMembers = cancleMatching.members.filter(
        (user) => user !== data.id
      );
      cancleMatching.members = filterdMatchMembers;
      await cancleMatching.save();
      // }
      chat.to(data.room).emit("getApplyAndMatchedUserList", {
        applyUser: cancleMatching.applyUser,
        matchedMembers: cancleMatching.members,
      });
    });
  });

  // end of code
};
