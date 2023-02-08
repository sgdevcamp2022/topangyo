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

/**
 * 매칭 모델을 추후
 * CMS에서 현재 상태를 CMS상태를 가져와서 저장하는 방식으로 진행함.
 * 확정을 누르면 매칭 모델이 저장이 되고 페이지는 그 사람들 빼고는 진입 금지.
 *
 */
