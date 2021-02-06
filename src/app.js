require('express-async-errors');
require('dotenv').config();
// require('./utils/loadRelationships');

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());



/* eslint-disable-next-line no-unused-vars */
app.use((error, req, res, next) => {
  console.error(error);
  return res.sendStatus(500);
});

module.exports = app;
