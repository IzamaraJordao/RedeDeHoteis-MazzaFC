'use strict';


module.exports = {
  
  up:(queryInterface, Sequelize) => {

    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.dropTable('schedule',
       { transaction: t }),
         queryInterface.createTable('schedule', {
            id: {
              allowNull: false,
              increment: true,                                                 
              type: Sequelize.STRING(36),
              primaryKey: true,
            },
            date_initial: {
              allowNull: false,
              type: Sequelize.DATEONLY,
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
              allowNull: true,
              type: Sequelize.STRING(36),
              references: {
                model: 'reservations',
                key: 'id',
              },
            },
            created_at: {
              allowNull: false,
              type: Sequelize.DATE,
              defaultValue: Sequelize.fn('now'),
            },
            updated_at: {
              allowNull: false,
              type: Sequelize.DATE,
              defaultValue: Sequelize.fn('now'),
              onUpdate: 'SET DEFAULT', 
            },
        }, { transaction: t }),
         queryInterface.addConstraint('schedule', {
          fields: ['date_initial', 'bedroom_id'],
          type: 'unique',
          name: 'unique_constraint_schedule_date_initial_bedroom_id',
        },{ transaction: t }),
      ]);
    });
    },
  

    

  down: queryInterface => queryInterface.dropTable('schedule'),
};

