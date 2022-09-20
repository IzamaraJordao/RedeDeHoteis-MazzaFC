
'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    const UsersTable = queryInterface.createTable('guest', {
      id: {
        allowNull: false,                                                 
        primaryKey: true,
        type: Sequelize.STRING(36),
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cpf: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(11),
      },
      rg: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(9),
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(80),
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING(16),
      } ,
      address_id: {
        allowNull: false,
        type: Sequelize.STRING(36),
        references: {
          model: 'address',
          key: 'id',
        },
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

  down: queryInterface => queryInterface.dropTable('guest'),
};

  