const User = require("../models/User");
const jwt = require("jsonwebtoken");

const handleTokenRefresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.token) return res.sendStatus(400);

  const refreshToken = cookies.token;
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });

  const foundUser = await User.findOne({ refreshToken });
  if (!foundUser) return res.sendStatus(204);

  try {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          foundUser.refreshToken = "null";
          const result = await foundUser.save();
          return res.sendStatus(403);
        }

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

        const newRefreshToken = jwt.sign(
          {
            _id: foundUser._id,
          },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d" }
        );

        foundUser.refreshToken = newRefreshToken;
        const result = await foundUser.save();

        // Create Secure Cookie with refreshToken
        res.cookie("jwt", newRefreshToken, {
          httpOnly: true,
          sameSite: "None",
          maxAge: 24 * 60 * 60 * 1000,
          secure: true,
        }); //secure: true,

        res.status(201).json({ accessToken });
      }
    );
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports = { handleTokenRefresh };
