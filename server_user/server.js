require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const logger = require("./config/logger");
const morganMiddleware = require("./middlewares/morgan");
const cookieParser = require("cookie-parser");
const credentials = require("./middlewares/credentials");
const connectDB = require("./config/dbConn");

// each server port!
const PORT = process.env.PORT || 3600;

// Connect to Database
connectDB();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data and json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

app.use(morganMiddleware);

// routes
app.use("/user", require("./routes/user"));

// open server with specific port
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
