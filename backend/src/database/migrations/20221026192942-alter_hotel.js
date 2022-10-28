'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const HotelColumn = queryInterface.removeColumn('hotel', 'floors');
    const HotelCreateFloor = queryInterface.addColumn('hotel', 'floor_hotel', {
      allowNull: false,
      type: Sequelize.INTEGER,
    });

    return HotelColumn, HotelCreateFloor; ;
  },


  down: queryInterface => queryInterface.dropTable('hotel'),
};

