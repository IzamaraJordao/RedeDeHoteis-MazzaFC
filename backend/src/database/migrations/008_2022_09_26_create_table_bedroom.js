'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const UsersTable = queryInterface.createTable('bedroom', {
      id: {
        allowNull: false,                                                 
        primaryKey: true,
        type: Sequelize.STRING(36),
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING(80),
      },
      tipo: {
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

    return UsersTable;
  },

  down: queryInterface => queryInterface.dropTable('bedroom'),
};
