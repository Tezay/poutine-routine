require('dotenv').config({ quiet: true });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

const corsOptions = {
  origin: process.env.CLIENT_ORIGIN,
  credentials: true,
};
app.use(cookieParser());
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Poutine Routine' });
});

const dbConfig = require('./app/config/db.config');
const db = require('./app/models');

const PORT = process.env.PORT;

const start = async () => {
  try {
    await db.connex.sync();
  } catch (err) {
    console.error(`Cannot use MySQL at ${dbConfig.HOST}:${dbConfig.PORT}: ${err.message}`);
    console.error('Is the database running, and do the DB_ values of .env match it?');
    process.exit(1);
  }
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

start();
