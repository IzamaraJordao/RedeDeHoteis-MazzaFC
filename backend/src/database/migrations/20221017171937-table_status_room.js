'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const RoomStatusTable = queryInterface.createTable('status_room', {
      id: {
        allowNull: false,
        increment: true,
        primaryKey: true,
        type: Sequelize.STRING(36),
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(36),
      }
      });


    return RoomStatusTable;
  },

  down: queryInterface => queryInterface.dropTable('bedroom'),
};
