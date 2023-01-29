const jwt = require("jsonwebtoken");

const handleTokenInfo = async (req, res) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(400);
  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
      if (err) return res.sendStatus(403);
      return res.status(200).json({
        decode,
      });
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports = { handleTokenInfo };
