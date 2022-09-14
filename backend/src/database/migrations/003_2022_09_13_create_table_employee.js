
'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    const UsersTable = queryInterface.createTable('employee', {
      id: {
        allowNull: false,                                                 
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cpf: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      rg: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING,
      } ,
      address_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'address',
          key: 'id',
        },
      },
      note : {
        allowNull: true,
        type: Sequelize.STRING,
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
        type: Sequelize.INTEGER,
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

  down: queryInterface => queryInterface.dropTable('employee'),
};

  