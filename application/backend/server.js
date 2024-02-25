import express from 'express';
import {handler} from '../frontend/build/handler.js'

const app = express();
const PORT = 3000;

app.get('/backtest', (req, res) => {
  res.send('Hello World');
});

app.use(handler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});