const ChatRoom = require("../models/ChatRoom");
const Matching = require("../models/Matching");

const handleCreateMatch = async (req, res) => {
  const { room, Id } = req.body;

  try {
    const check = await Matching.findOne({ room: toString(room) });
    if (!check) {
      Promise.all([
        Matching.create({
          room,
          host: Id,
          members: [Id],
          applyUser: [],
          chatUser: [Id],
          matchingStatus: "proceed",
        }),
        ChatRoom.create({
          room,
          host: Id,
        }),
      ]);
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { handleCreateMatch };

/**
 * 매칭 모델을 추후
 * CMS에서 현재 상태를 CMS상태를 가져와서 저장하는 방식으로 진행함.
 * 확정을 누르면 매칭 모델이 저장이 되고 페이지는 그 사람들 빼고는 진입 금지.
 *
 */
