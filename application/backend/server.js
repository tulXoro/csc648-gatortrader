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

import posts from './routes/posts.js';
import registerUser from './routes/registerUser.js';
import getCategories from './routes/getCategories.js';
import login from './routes/login.js';
import uploadImage from './routes/uploadImage.js';
import message from './routes/message.js';
import getSellerPosts from './routes/getSellerPosts.js';
import getPostById from './routes/getPostById.js';
import getPostsCount from './routes/getPostsCount.js';
import user from './routes/user.js';

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
  // console.log("requireSession check", req);
  if (req.session?.user?.username || allowGuestUsers(req)) {
    // Session exists and user is logged in
    next(); // Proceed to the next middleware or route handler
  } else {
    // Session doesn't exist or user is not logged in
    res.status(401).send('Unauthorized'); // Respond with unauthorized status
  }
};

const restrictedPaths = ["/getSellerPosts", "/message", "/upload"];
const allowGuestUsers = req => {
  const { path, method } = req;
  console.log("path", path, "method", method);
  return !restrictedPaths.includes(path)
            && !(path === "/posts" && method.toLowerCase() === "post");
};

app.get('/backtest', (req, res) => {
  res.send('Hello World');
});

const noCacheMiddleware = (req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
};

app.use('/', noCacheMiddleware);


app.use(bodyParser.json());
app.use('/login', login);

app.use('/', requireSession);

// Use CORS middleware
// app.use(cors());

app.use('/getCategories', getCategories);
app.use('/user', user);
app.use('/posts', posts);
app.use('/getSellerPosts', getSellerPosts);
app.use('/getPostById', getPostById);
app.use('/getPostsCount', getPostsCount);

app.use('/image', express.static(path.join(dirname(fileURLToPath(import.meta.url)), 'images')));

app.use(bodyParser.json());
app.use('/registerUser', registerUser);
app.use('/upload', uploadImage);
app.use('/message', message);

app.use(handler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
