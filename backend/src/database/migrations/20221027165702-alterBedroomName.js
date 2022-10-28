'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const BedroomType = queryInterface.addColumn('bedroom', 'name', {
      allowNull: false,
      type: Sequelize.STRING(36),
    });


    return  BedroomType;
  },

  down: queryInterface => queryInterface.dropTable('bedroom'),
};
