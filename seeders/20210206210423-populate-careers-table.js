'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('careers', [
      { title: 'Front-End' },
      { title: 'Back-End' },
      { title: 'Full-Stack' },
      { title: 'Ux/Ui' },
      { title: 'Produto' },
      { title: 'Data Science' },
      { title: 'QA' },
      { title: 'Games' },
      { title: 'Mobile' },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('careers', [
      { title: 'Front-End' },
      { title: 'Back-End' },
      { title: 'Full-Stack' },
      { title: 'Ux/Ui' },
      { title: 'Produto' },
      { title: 'Data Science' },
      { title: 'QA' },
      { title: 'Games' },
      { title: 'Mobile' },
    ], {});
  },
};
