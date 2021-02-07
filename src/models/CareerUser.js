const { Sequelize } = require('sequelize');
const sequelize = require('../utils/database');

class CareerUser extends Sequelize.Model { }

CareerUser.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    careerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'careerUser'
  }
);

module.exports = CareerUser;
