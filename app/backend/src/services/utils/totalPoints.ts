import IMatch from '../../interfaces/IMatch';
import totalVictories from './totalVictories';
import totalDraw from './totalDraw';

const totalPoints = (teamId: number, matches: IMatch[], performance: string | undefined) => {
  const Points = totalVictories(teamId, matches, performance) * 3
    + totalDraw(teamId, matches, performance);
  return Points;
};
export default totalPoints;
