const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { id, password } = req.body;
  if (!id || !password) return res.sendStatus(400);

  if (id && typeof id !== "string") return res.sendStatus(400);
  if (password && typeof password !== "string") return res.sendStatus(400);

  const foundUser = await User.findOne({ id });
  if (!foundUser) return res.sendStatus(204);

  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    // const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        userInfo: {
          id: foundUser.id,
          nickname: foundUser.nickname,
          gender: foundUser.gender,
          roles: foundUser.roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );

    const refreshToken = jwt.sign(
      {
        _id: foundUser._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();

    res.cookie("token", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000, // 86400초(하루)
      secure: true,
    }); //secure: true,



    res.status(201).json({ accessToken });
  } else {
    res.sendStatus(500);
  }
};

module.exports = { handleLogin };
