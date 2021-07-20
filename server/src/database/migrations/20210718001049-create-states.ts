'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.createTable('states', {
      id: {
        type: Sequelize.INTEGER,
        field: 'id',
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      key: {
        type: Sequelize.STRING(50),
        trim: true,
        allowNull: false,
        unique: true
      },
      value: {
        type: Sequelize.STRING(50),
        trim: true,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        field: 'createdAt',
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: 'updatedAt',
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('states');
  }
};
