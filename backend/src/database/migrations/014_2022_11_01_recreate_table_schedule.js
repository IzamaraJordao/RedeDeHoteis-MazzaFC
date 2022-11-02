'use strict';


module.exports = {
  
  up:(queryInterface, Sequelize) => {

    const exclui = queryInterface.dropTable('schedule');

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
        type: Sequelize.STRING(80),
      },
      bedroom_id:{
        allowNull: false,
        type: Sequelize.STRING(36),
        references: {
          model: 'bedroom',
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
      },
    });

    return schedule,exclui;
  },

  down: queryInterface => queryInterface.dropTable('schedule'),
};

