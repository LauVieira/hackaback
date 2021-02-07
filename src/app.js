require('express-async-errors');
require('dotenv').config();
require('./utils/loadRelationships');
const express = require('express');
const cors = require('cors');
const careersRouter = require('../src/routers/careersRouter');
const usersRouter = require('../src/routers/usersRouter');
const { NotFoundError, WrongPasswordError } = require('../src/errors/index');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', usersRouter);
app.use('/career', careersRouter);

/* eslint-disable-next-line no-unused-vars */
app.use((error, req, res, next) => {
  console.error(error);
  if (error instanceof NotFoundError) return res.status(404).send(error.message);
  else if (error instanceof WrongPasswordError) return res.status(401).send(error.message);
  else res.status(500).json(error.message);
});

module.exports = app;
