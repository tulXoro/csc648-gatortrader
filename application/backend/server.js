/**************************************************************
* Class: CSC-648-03 Spring 2024
* Team: 05
* GitHub ID: csc648-sp24-03-team05
* Project: SWE Final Project
*
* File: server.js
* Description: Entry point for end points and session management
**************************************************************/

import express from 'express';
import session from 'express-session';
import Sequelize from 'sequelize';
import SequelizeStore from 'connect-session-sequelize';

import { handler } from '../frontend/build/handler.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

import getPosts from './routes/getPosts.js';
import registerUser from './routes/registerUser.js';
import getCategories from './routes/getCategories.js';
import login from './routes/login.js';
import uploadImage from './routes/uploadImage.js';
import message from './routes/message.js';

const app = express();
const PORT = 3000;

// Initialize Sequelize instance
const sequelize = new Sequelize({
  dialect: 'mariadb', // Choose your database dialect
  host: '34.210.12.165',
  username: 'admin',
  password: 'SweTE@m05',
  database: 'GatorTrader',
});

// Initialize SequelizeStore
const Store = SequelizeStore(session.Store);
const store = new Store({
  db: sequelize,
});

app.use(session({
  secret: 'SweTE@m05-secret-key',
  resave: false,
  saveUninitialized: false,
  store: store
}));

// Sync the session store with the database
store.sync();

// Test database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

const requireSession = (req, res, next) => {
  // console.log("requireSession check", req, res);
  if (req.session?.user?.username || req.path === "login") {
    // Session exists and user is logged in
    next(); // Proceed to the next middleware or route handler
  } else {
    // Session doesn't exist or user is not logged in
    res.status(401).send('Unauthorized'); // Respond with unauthorized status
  }
};

app.get('/backtest', (req, res) => {
  res.send('Hello World');
});

app.use(bodyParser.json());
app.use('/login', login);

// app.use('/', requireSession);

// Use CORS middleware 
// app.use(cors()); 

app.use('/getCategories', getCategories);
app.use('/getPosts', getPosts);

app.use('/image', express.static(path.join(dirname(fileURLToPath(import.meta.url)), 'images')));

app.use(bodyParser.json());
app.use('/registerUser', registerUser);
app.use('/upload', uploadImage);
app.use('/message', message);

app.use(handler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
