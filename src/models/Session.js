const { Sequelize } = require('sequelize');
const sequelize = require('../utils/database');

class Session extends Sequelize.Model { }

Session.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'session'
  }
);

module.exports = Session;
