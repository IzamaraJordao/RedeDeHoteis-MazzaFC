'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const ReservationTable = queryInterface.createTable('reservations', {
      id: {
        allowNull: false,  
        increment: true,                                               
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
      check_in_static: {
        allowNull: false,
        type: Sequelize.DATE,
        
      },
      check_out_static: {
        allowNull: false,
        type: Sequelize.DATE,
        
      },
      bedroom_id:{
        allowNull: false,
        type: Sequelize.STRING(36),
        references: {
          model: 'bedroom',
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

    return ReservationTable;
  },

  down: queryInterface => queryInterface.dropTable('reservations'),
};
