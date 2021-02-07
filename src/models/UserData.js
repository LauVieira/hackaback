const { Sequelize } = require('sequelize');
const sequelize = require('../utils/database');

class UserData extends Sequelize.Model { }

UserData.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(2500),
      allowNull: false,
    },
    level: {
      type: Sequelize.ENUM('Júnior', 'Pleno', 'Sênior'),
      allowNull: false,
    },
    linkedin: {
      type: Sequelize.STRING,
    },
    topics: {
      type: Sequelize.STRING(1000),
      allowNull: false,
    },
    photo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    website: {
      type: Sequelize.STRING,
    },
    inviteCode: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    contactEmail: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }, 
  {
    sequelize,
    modelName: 'userData',
    tableName: 'userData',
  }
);

module.exports = UserData;
