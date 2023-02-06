const mongoose = require("mongoose");

// mongoDB를 위한 연결입니다.
// 다른 DB 이용은 아래를 수정하시면 됩니다.
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }

  mongoose.connection.on("error", (error) => {
    console.error("MongoDB connect ERROR", error);
  });

  mongoose.connection.on("disconnected", () => {
    console.error("MongoDB DISCONNECTED");
    connectDB();
  });
};
module.exports = connectDB;
