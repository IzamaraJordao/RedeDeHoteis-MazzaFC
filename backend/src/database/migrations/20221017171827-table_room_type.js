'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const RoomTypeTable = queryInterface.createTable('room_type', {
      id: {
        allowNull: false,
        increment: true,
        primaryKey: true,
        type: Sequelize.STRING(36),
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(36),
      },
      color:{
        allowNull: false,
        type: Sequelize.STRING(36),
      }

      });


    return RoomTypeTable;
  },

  down: queryInterface => queryInterface.dropTable('bedroom'),
};
