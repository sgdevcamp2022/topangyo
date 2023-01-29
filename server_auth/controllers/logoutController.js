const User = require("../models/User");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.token) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    return res.sendStatus(204);
  }

  foundUser.refreshToken = "null";
  const result = await foundUser.save();

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(201);
};

module.exports = { handleLogout };
