'use-strict';

module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('teams',{
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        team_name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
      },
      {
        timestamps: false,
      });
  },
  down: async (QueryInterface) => {
    await QueryInterface.dropTable('teams');
  },
};