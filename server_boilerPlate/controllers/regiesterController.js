const User = require("../models/User");
const bcrypt = require("bcrypt");

// controller sample
const handleNewUserRegist = async (req, res) => {
  try {
    const { id, password, name, nickname, email, phoneNumber, birth, gender } =
      req.body;

    if (
      !id ||
      !password ||
      !name ||
      !nickname ||
      !email ||
      !phoneNumber ||
      !birth ||
      !gender
    )
      return res.sendStatus(400);
    if (id && typeof id !== "string") return res.sendStatus(400);
    if (password && typeof password !== "string") return res.sendStatus(400);
    if (name && typeof name !== "string") return res.sendStatus(400);
    if (nickname && typeof nickname !== "string") return res.sendStatus(400);
    if (email && typeof email !== "string") return res.sendStatus(400);
    if (phoneNumber && typeof phoneNumber !== "number")
      return res.sendStatus(400);
    if (birth && typeof birth !== "string") return res.sendStatus(400);
    if (gender && typeof gender !== "boolean") return res.sendStatus(400);

    const duplicate = await User.findOne({ id });
    if (duplicate) return res.sendStatus(409); // Conflict

    const hashedPwd = await bcrypt.hash(password, 10);

    const result = await User.create({
      id,
      password: hashedPwd,
      name,
      nickname,
      email,
      phoneNumber,
      birth,
      gender,
    });

    res.sendStatus(201);
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

module.exports = { handleNewUserRegist };
