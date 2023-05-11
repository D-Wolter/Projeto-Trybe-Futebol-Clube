import Teams from '../database/models/TeamModel';

export default class TeamsService {
  private teamModel: Teams;
  constructor() {
    this.teamModel = new Teams();
  }

  getAllTeams = async () => {
    const teams = await Teams.findAll();
    return teams;
  };

  getTeamById = async (id: string) => {
    const team = await Teams.findOne({ where: { id } });
    return (team);
  };
}
