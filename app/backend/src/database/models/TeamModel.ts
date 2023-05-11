import { DataTypes, Model } from 'sequelize';
import db from '.';

class Team extends Model {
  id!: number;
  teamName!: string;
}

Team.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    timestamps: false,
    sequelize: db,
    modelName: 'teams',
  },
);

export default Team;
