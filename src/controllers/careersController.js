/* eslint-disable class-methods-use-this */

const Career = require('../models/Career');

class CareerController {
  getCareers () {
    return Career.findAll();
  }
}

module.exports = new CareerController();
