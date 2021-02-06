const { Sequelize } = require('sequelize');
const sequelize = require('../utils/database');

class User extends Sequelize.Model { }

User.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING(),
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING(),
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING(),
    allowNull: false,
  },
  role: {
    type: Sequelize.STRING(),
    allowNull: false,
  },
}, 
  {
    sequelize,
    modelName: 'user',
  }
);

module.exports = User;
