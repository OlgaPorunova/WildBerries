const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const store = require('session-file-store');
const path = require('path')
const apiRouter = require('./routes/apiRouter');

require('dotenv').config();

const PORT = process.env.SERVER_PORT || 3001;

const app = express();

app.set('view engine', 'jsx');
app.set('views', path.join(__dirname, 'components'));

app.use(express.static('public'));
app.use(cors());
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const FileStore = store(session);

const sessionConfig = {
  name: 'user_sid',
  secret: process.env.SESSION_SECRET ?? 'oh_klahoma',
  resave: false,
  store: new FileStore(),
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
};

app.use(session(sessionConfig));

app.use('/users', apiRouter);

app.listen(PORT, () => console.log(`Vsyo ok na porty ${PORT}`));
