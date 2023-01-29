const User = require("../models/User");

const handleGetUserInfo = async (req, res) => {
  try {
    const foundUser = await User.findOne(
      { id: req.tokenDecode.userInfo.id },
      {
        _id: 0,
        password: 0,
        currentPlace: 0,
        OAuth: 0,
        roles: 0,
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

module.exports = { handleGetUserInfo };
