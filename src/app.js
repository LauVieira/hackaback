require('express-async-errors');
require('dotenv').config();
// require('./utils/loadRelationships');

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const usersRouter = require('../src/routers/usersRouter');

/* eslint-disable-next-line no-unused-vars */
app.use((error, req, res, next) => {
  console.error(error);
  return res.sendStatus(500);
});

app.use('/user', usersRouter);

module.exports = app;
