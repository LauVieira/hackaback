require('express-async-errors');
require('dotenv').config();
// require('./utils/loadRelationships');

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const usersRouter = require('../src/routers/usersRouter');

app.use('/user', usersRouter);

app.use((error, req, res, next) => {
  console.error(error);
  return res.sendStatus(500);
});

module.exports = app;
