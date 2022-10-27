'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const BedroomColumn = queryInterface.removeColumn('bedroom', 'status');
    const BedroomCreateStatus = queryInterface.removeColumn('bedroom', 'status');
    const BedroomType = queryInterface.addColumn('bedroom', 'status_room_id', {
      allowNull: false,
      type: Sequelize.STRING(36),
      references: {
        model: 'status_room',
        key: 'id',
      },
    });
    const BedroomStatus = queryInterface.addColumn('bedroom', 'room_type_id', {
      allowNull: false,
      type: Sequelize.STRING(36),
      references: {
        model: 'room_type',
        key: 'id',
      },
      });

    return  BedroomType, BedroomStatus;
  },

  down: queryInterface => queryInterface.dropTable('bedroom'),
};
