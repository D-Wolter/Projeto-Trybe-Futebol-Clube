import IMatch from '../../interfaces/IMatch';
import totalPoints from './totalPoints';
import totalGames from './totalGames';

const Efficiency = (teamId: number, matches: IMatch[], performance: string | undefined) => {
  if (performance === 'home') {
    const matchesHome = matches
      .filter((match) => match.homeTeamId === teamId);
    const efficiency = (totalPoints(teamId, matchesHome, 'home')
    / (totalGames(teamId, matchesHome, 'home') * 3)) * 100;
    return Number(efficiency.toFixed(2));
  }
  if (performance === 'away') {
    const matchesAway = matches
      .filter((match) => match.awayTeamId === teamId);
    const efficiency = (totalPoints(teamId, matchesAway, 'away')
    / (totalGames(teamId, matchesAway, 'away') * 3)) * 100;
    return Number(efficiency.toFixed(2));
  }
  const efficiency = (totalPoints(teamId, matches, 'general')
  / (totalPoints(teamId, matches, 'general') * 3)) * 100;
  return Number(efficiency.toFixed(2));
};
export default Efficiency;
