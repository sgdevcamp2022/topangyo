const mock = require("../../mock");
const ChatRoom = require("../models/ChatRoom");

const handleTest = async (req, res) => {
  const { room, Id } = req.body;
  const check = mock.currentMatchingStatus.filter(
    (element) => element.room === room
  );
  if (check.length === 0) {
    const obj = { room, members: [Id] };
    mock.currentMatchingStatus.push(obj);
  }

  console.log(mock.currentMatchingStatus);
};

module.exports = { handleTest };
