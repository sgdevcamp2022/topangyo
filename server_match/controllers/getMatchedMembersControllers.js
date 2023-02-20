const Matching = require("../models/Matching");

const handleMatchedMembersList = async (req, res) => {
  const { room } = req.body;

  try {
    const foundMatching = await Matching.findOne(
      { room: room.toString() },
      { members: 1, _id: 0 }
    );
    if (!foundMatching) res.sendStatus(400);

    res.status(200).json({ membersList: foundMatching });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { handleMatchedMembersList };
