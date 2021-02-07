/* eslint-disable class-methods-use-this */

const Career = require('../models/Career');

class CareerController {
  getCareers () {
    return Career.findAll();
  }

  getByCareerId (id) {
    return Career.findAll({
      where: { id },
      include: [
        { model: User }, // load all pictures
        
      ]
    });
  }
}

module.exports = new CareerController();
