'use strict';

module.exports = {
   up: (queryInterface, Sequelize) => {
    const BedroomPositionX = queryInterface.addColumn('bedroom', 'position_x', {
      allowNull: true,
      type: Sequelize.INTEGER,
    });
    const BedroomPositionY = queryInterface.addColumn('bedroom', 'position_y', {
      allowNull: true,
      type: Sequelize.INTEGER,
    });


    return  BedroomPositionX, BedroomPositionY;
  },

  down: queryInterface => { 
    const x = queryInterface.removeColumn('bedroom', 'position_x')
    const y = queryInterface.removeColumn('bedroom', 'position_y');
    return x, y;
  },
};
