'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const EmployeeTable = queryInterface.createTable('employee', {
      id: {
        allowNull: false,                                                 
        primaryKey: true,
        type: Sequelize.STRING(36),
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(80),
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
      note : {
        allowNull: true,
        type: Sequelize.STRING(200),
      },
      active:{
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      
      },
      password:{
        allowNull: false,
        type: Sequelize.STRING,
      },
      hotel_id: {
        allowNull: false,
        type: Sequelize.STRING(36),
        references: {
          model: 'hotel',
          key: 'id',
        },
      },
      is_first_access:{
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });

    return EmployeeTable;
  },

  down: queryInterface => queryInterface.dropTable('employee'),
};
