require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const corsOptions = require("./config/corsOptions");
//const logger = require("./config/logger");
// const morganMiddleware = require("./middlewares/morgan");
const credentials = require("./middlewares/credentials");

const app = express();

const PORT = process.env.PORT || 3700;

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Set CORS option
app.use(cors(corsOptions));

// Parse requests of content-type: application/json
app.use(bodyParser.json());

// built-in middleware to handle urlencoded form data and json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(morganMiddleware);

// RESTful API route for DB
app.use('/', require('./routes/content'))

// DB Connection
const db = require('./models/index');
      db.sequelizeConfig.sync();

// Default route for server status
app.get('/', (req, res) => {
  res.json({ message: `Server is running on port ${PORT}` });
});

// Set listen port for request
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// open server with specific port
// app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));