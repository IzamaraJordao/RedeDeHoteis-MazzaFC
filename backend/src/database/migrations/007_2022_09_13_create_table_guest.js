
'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    const GuestTable = queryInterface.createTable('guest', {
      id: {
        allowNull: false,
        increment: true,                                                 
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

    return GuestTable;
  },

  down: queryInterface => queryInterface.dropTable('guest'),
};

  