import express from 'express';
import { handler } from '../frontend/build/handler.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

import getPosts from './routes/getPosts.js';
import registerUser from './routes/registerUser.js';
import getCategories from './routes/getCategories.js';
import login from './routes/login.js';

const app = express();
const PORT = 3000;

// Use CORS middleware 
// app.use(cors()); 

app.get('/backtest', (req, res) => {
  res.send('Hello World');
});


app.use('/getCategories', getCategories);
app.use('/getPosts', getPosts);

app.use('/image', express.static(path.join(dirname(fileURLToPath(import.meta.url)), 'images')));

app.use(bodyParser.json());
app.use('/registerUser', registerUser);
app.use('/login', login);

app.use(handler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
