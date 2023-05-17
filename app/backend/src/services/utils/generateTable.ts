import IMatch from '../../interfaces/IMatch';
import Team from '../../database/models/TeamModel';
import efficiency from './efficiency';
import goalsBalance from './goalsBalance';
import goalsFavor from './goalsFavor';
import goalsOwn from './goalsOwn';
import totalDraw from './totalDraw';
import totalGames from './totalGames';
import totalLosses from './totalLosses';
import totalPoints from './totalPoints';
import totalVictories from './totalVictories';

const generateTable = (teams: Team[], matches: IMatch[], performance: string | undefined) => {
  const table = teams.map((team: Team) => ({
    name: team.teamName,
    totalPoints: totalPoints(Number(team.id), matches, performance),
    totalGames: totalGames(Number(team.id), matches, performance),
    totalVictories: totalVictories(Number(team.id), matches, performance),
    totalDraws: totalDraw(Number(team.id), matches, performance),
    totalLosses: totalLosses(Number(team.id), matches, performance),
    goalsFavor: goalsFavor(Number(team.id), matches, performance),
    goalsOwn: goalsOwn(Number(team.id), matches, performance),
    goalsBalance: goalsBalance(Number(team.id), matches, performance),
    efficiency: efficiency(Number(team.id), matches, performance),
  }));
  return table;
};
export default generateTable;
