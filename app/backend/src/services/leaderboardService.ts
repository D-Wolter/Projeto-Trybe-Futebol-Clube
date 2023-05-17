import { ModelStatic } from 'sequelize';
import Team from '../database/models/TeamModel';
import Match from '../database/models/MatcheModel';
import generateTable from './utils/generateTable';
import sortTable from './utils/sortTable';
import ILeaderboard from '../interfaces/ILeaderboard';
import ILeaderboardService from '../interfaces/ILeaderboardService';
import sequelize from '../database/models';
import Query from './utils/LeaderboardQuery';

export default class LeaderboardService implements ILeaderboardService {
  constructor(private _model = sequelize) { }
  protected teamModel: ModelStatic<Team> = Team;
  protected matchModel: ModelStatic<Match> = Match;

  async homePerfomance(): Promise<ILeaderboard[]> {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findAll();
    const finishedMatches = matches.map((match: Match) => {
      if (match.dataValues.inProgress === false) {
        return match.dataValues;
      }
      return {};
    });
    const tableHome = generateTable(teams, finishedMatches, 'home');
    return sortTable(tableHome);
  }

  async awayPerfomance(): Promise<ILeaderboard[]> {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findAll();

    const finishedMatchesAway = matches.map((match: Match) => {
      if (match.dataValues.inProgress !== true) {
        return match.dataValues;
      }
      return {};
    });
    const tableAway = generateTable(teams, finishedMatchesAway, 'away');
    return sortTable(tableAway);
  }

  async getFullLeaderboard(): Promise<ILeaderboard[]> {
    const [getFullLeaderboardArray] = await this._model.query(Query);

    return getFullLeaderboardArray as ILeaderboard[];
  }
}
