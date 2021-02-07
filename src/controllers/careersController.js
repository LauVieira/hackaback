/* eslint-disable class-methods-use-this */

const Career = require('../models/Career');
const CareerUser = require('../models/CareerUser');
const User = require('../models/User');
const UserData = require('../models/UserData');

class CareerController {
  getAll() {
    return Career.findAll();
  }

  async getAllUsersByCareer(careerId) {
    //buscar todos os usersData de uma categoria
    return await User.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt',]
      },

      include: [{
        model: CareerUser,
        where: {
          careerId
        }
      }, {
        model: UserData,
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
      }],

    });
  }
};

module.exports = new CareerController();
