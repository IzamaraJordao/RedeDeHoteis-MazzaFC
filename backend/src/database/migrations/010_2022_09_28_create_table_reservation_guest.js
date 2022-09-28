'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const ReservationGuestTable = queryInterface.createTable('reservation_guest', {
      id: {
        increment: true,
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
       

      },
      guest_id: {
        allowNull: false,
        type: Sequelize.STRING(36),
        references: {
          model: 'guest',
          key: 'id',
        },
      },
      reservation_id: {
        allowNull: false,
        type: Sequelize.STRING(36),
        references: {
          model: 'reservations',
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
      }
    });
    return ReservationGuestTable;
  },
  down: queryInterface => queryInterface.dropTable('reservations_guest'),
};
