const { Sequelize } = require('sequelize');
const sequelize = require('../utils/database');

class Career extends Sequelize.Model { }

Career.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'career'
  }
);

module.exports = Career;
