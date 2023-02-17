const Matching = require("../models/Matching");

const handleConfirmMatch = async (req, res) => {
  try {
    const { room } = req.body;
    if (!room) return res.sendStatus(400);

    if (room && typeof room !== "string") return res.sendStatus(400);

    const foundMatch = await Matching.findOneAndUpdate(
      { room },
      { matchingStatus: "confirm" }
    );

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { handleConfirmMatch };
