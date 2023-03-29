const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const connect = require('./config/database');
const postRouter = require('./routes/posts');

connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:8000'],
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.json('this the home page');
});

app.use('/api/posts', postRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
