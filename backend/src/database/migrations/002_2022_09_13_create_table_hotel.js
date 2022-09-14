
'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    const UsersTable = queryInterface.createTable('hotel', {
      id: {
        allowNull: false,                                                 
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cnpj: {
        allowNull: false,
        unique: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
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

  down: queryInterface => queryInterface.dropTable('hotel'),
};

  