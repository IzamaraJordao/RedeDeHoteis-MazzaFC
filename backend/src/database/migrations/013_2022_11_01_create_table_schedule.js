'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const schedule = queryInterface.createTable('schedule', {
      id: {
        allowNull: false,
        increment: true,                                                 
        type: Sequelize.STRING(36),
        primaryKey: true,
      },
      date_initial: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(14),
      },
      final_date: {
        allowNull: false,
        type: Sequelize.STRING(100),
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

    return schedule;
  },

  down: queryInterface => queryInterface.dropTable('schedule'),
};

