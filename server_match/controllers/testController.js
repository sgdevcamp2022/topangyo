const data = require("../data");

const handleTest = async (req, res) => {
  const { room, Id } = req.body;
  const check = data.currentMatchingStatus.filter(
    (element) => element.room === room
  );
  if (check.length === 0) {
    const obj = { room, members: [Id] };
    data.currentMatchingStatus.push(obj);
  }

  res.sendStatus(200);
};

module.exports = { handleTest };
