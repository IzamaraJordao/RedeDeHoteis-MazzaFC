'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const BedroomTable = queryInterface.createTable('bedroom', {
      id: {
        allowNull: false,                                                 
        primaryKey: true,
        type: Sequelize.STRING(36),
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING(80),
      },
      room_types: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      guest_id: {
        allowNull: false,
        type: Sequelize.STRING(36),
        references: {
          model: 'guest',
          key: 'id',
        },
      },
      hotel_id: {
        allowNull: false,
        type: Sequelize.STRING(36),
        references: {
          model: 'hotel',
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
    

    return BedroomTable;
  },

  down: queryInterface => queryInterface.dropTable('bedroom'),
};
