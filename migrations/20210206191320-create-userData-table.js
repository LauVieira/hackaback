'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('userData', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
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
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('userData');
  },
};
