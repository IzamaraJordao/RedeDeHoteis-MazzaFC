'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const UsersTable = queryInterface.createTable('address', {
      id: {
        allowNull: false,                                                 
        type: Sequelize.STRING(36),
        primaryKey: true,
      },
      street: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      number: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      complement: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      neighborhood: {
        allowNull: false,
        type: Sequelize.STRING(15),
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING(2),
      },
      zip_code: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(8),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });

    return UsersTable;
  },

  down: queryInterface => queryInterface.dropTable('address'),
};

