const User = require("../models/User");

const handleSpecificUserInfo = async (req, res) => {
  const { userId } = req.params;
  try {
    const foundUser = await User.findOne(
      { id: userId },
      {
        password: 0,
        currentPlace: 0,
        refreshToken: 0,
        notification: 0,
      }
    );
    if (!foundUser) return res.sendStatus(204);

    const userInfo = foundUser;
    res.status(200).json({ userInfo });
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = { handleSpecificUserInfo };
