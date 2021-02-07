/* eslint-disable class-methods-use-this */

const Career = require('../models/Career');
const CareerUser = require('../models/CareerUser');
const User = require('../models/User');
const UserData = require('../models/UserData');

class CareerController {
  getAll () {
    return Career.findAll();
  }
}

module.exports = new CareerController();
