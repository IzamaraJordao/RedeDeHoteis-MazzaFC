'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const HotelTable = queryInterface.createTable('hotel', {
      id: {
        allowNull: false,                                                 
        type: Sequelize.STRING(36),
        primaryKey: true,
      },
      cnpj: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(14),
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(80),
      },
      floors: {
        allowNull: false,
        type: Sequelize.STRING(20),
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

    return HotelTable;
  },

  down: queryInterface => queryInterface.dropTable('hotel'),
};

