import { DataTypes, Model } from 'sequelize';
import db from '.';
import Team from './TeamModel';

class Matcher extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matcher.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    homeTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    awayTeamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    homeTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    awayTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    inProgress: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    underscored: true,
    timestamps: false,
    sequelize: db,
    tableName: 'matches',
  },
);

Matcher.belongsTo(Team, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Team.hasMany(Matcher, { foreignKey: 'homeTeamId', as: 'matchesHome' });

Matcher.belongsTo(Team, { foreignKey: 'awayTeamId', as: 'awayTeam' });
Team.hasMany(Matcher, { foreignKey: 'awayTeamId', as: 'matchesAway' });

export default Matcher;
