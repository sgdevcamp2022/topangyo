const data = require("../data");
const ChatRoom = require("../models/ChatRoom");

const handleTest = async (req, res) => {
  const { room, Id } = req.body;

  try {
    const check = data.currentMatchingStatus.filter(
      (element) => element.room === room
    );
    if (check.length === 0) {
      const obj = { room, members: [Id] };
      data.currentMatchingStatus.push(obj);
    }
    const result = await ChatRoom.create({
      room,
      host: Id,
    });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { handleTest };
