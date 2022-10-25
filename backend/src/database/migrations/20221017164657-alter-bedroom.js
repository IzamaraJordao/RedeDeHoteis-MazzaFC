'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const BedroomTable = queryInterface.createTable('bedroom', {
      id: {
        allowNull: false,
        increment: true,
        primaryKey: true,
        type: Sequelize.STRING(36),
      },
      hotel_id: {
        allowNull: false,
        type: Sequelize.STRING(36),
        references: {
          model: 'hotel',
          key: 'id',
        },
        floor: {
          allowNull: false,
          type: Sequelize.STRING(36),
        },
        position_x: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        position_y: {
          allowNull: false,
          type: Sequelize.STRING,
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
      },
      });


    return BedroomTable;
  },

  down: queryInterface => queryInterface.dropTable('bedroom'),
};
