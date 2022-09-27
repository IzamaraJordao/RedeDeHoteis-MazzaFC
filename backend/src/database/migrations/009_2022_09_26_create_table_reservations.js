'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const UsersTable = queryInterface.createTable('reservations', {
      id: {
        allowNull: false,                                                 
        primaryKey: true,
        type: Sequelize.STRING(36),
      },
      
      check_in: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      check_out: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      
    
      guest_id: {
        allowNull: false,
        type: Sequelize.STRING(36),
        references: {
          model: 'guest',
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

    return UsersTable;
  },

  down: queryInterface => queryInterface.dropTable('reservations'),
};
