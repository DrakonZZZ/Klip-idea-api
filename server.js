const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const connect = require('./config/database');
const postRouter = require('./routes/posts');

connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('this the home page');
});

app.use('/api/posts', postRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
