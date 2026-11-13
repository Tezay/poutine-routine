require('dotenv').config({ quiet: true });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const app = express();

const corsOptions = {
  origin: process.env.CLIENT_ORIGIN,
  credentials: true,
};
app.use(helmet());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: '10kb' }));
app.use(bodyParser.urlencoded({ extended: true }));
// body-parser leaves req.body undefined when a request has no body.
app.use((req, res, next) => {
  if (!req.body) {
    req.body = {};
  }
  next();
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Poutine Routine' });
});

const dbConfig = require('./app/config/db.config');
const db = require('./app/models');

require('./app/routes/user.route')(app);
require('./app/routes/tag.route.js')(app);

app.use((req, res) => {
  res.status(404).send({ message: 'Not found.' });
});

app.use((err, req, res, _next) => {
  const status = err.status >= 400 && err.status < 500 ? err.status : 500;
  if (status === 500) console.error(err);
  res.status(status).send({ message: status === 500 ? 'Server error.' : 'Invalid request.' });
});

const PORT = process.env.PORT;

const start = async () => {
  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is missing. Add it to .env (see .env.example).');
    process.exit(1);
  }
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
