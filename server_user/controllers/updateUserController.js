const User = require("../models/User");

const handleUpdateUserInfo = async (req, res) => {
  try {
    const { id, name, nickname, email, phoneNumber, birth, gender } = req.body;
    if (
      !id ||
      !name ||
      !nickname ||
      !email ||
      !phoneNumber ||
      !birth ||
      !gender
    )
      return res.sendStatus(400);
    if (id && typeof id !== "string") return res.sendStatus(400);
    if (name && typeof name !== "string") return res.sendStatus(400);
    if (nickname && typeof nickname !== "string") return res.sendStatus(400);
    if (email && typeof email !== "string") return res.sendStatus(400);
    if (phoneNumber && typeof phoneNumber !== "string")
      return res.sendStatus(400);
    if (birth && typeof birth !== "string") return res.sendStatus(400);
    if (gender && typeof gender !== "number") return res.sendStatus(400);

    if(req.tokenDecode.userInfo.id !== id)
    return res.sendStatus(401);

    const foundUser = await User.findOne({ id });
    if (!foundUser) return res.sendStatus(204);

    foundUser.nickname = nickname;
    foundUser.email = email;
    foundUser.phoneNumber = phoneNumber;
    foundUser.birth = birth;
    foundUser.gender = gender;
    foundUser.save();

    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = { handleUpdateUserInfo };
