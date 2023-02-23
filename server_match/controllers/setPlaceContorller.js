const Matching = require("../models/Matching");

const handlePlace = async (req, res) => {
  const { room, place } = req.body;

  try {
    const foundMatching = await Matching.findOne({ room: room.toString() });
    if (!foundMatching) return res.sendStatus(400);
    foundMatching.place = place;
    foundMatching.save();
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { handlePlace };
