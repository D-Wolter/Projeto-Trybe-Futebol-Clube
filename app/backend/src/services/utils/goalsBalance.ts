import IMatch from '../../interfaces/IMatch';
import goalsFavor from './goalsFavor';
import goalsOwn from './goalsOwn';

const goalsBalance = (teamId: number, matches: IMatch[], performance: string | undefined) => {
  if (performance === 'home') {
    const matchesHome = matches
      .filter((match) => match.homeTeamId === teamId);
    const balance = goalsFavor(teamId, matchesHome, 'home')
    - goalsOwn(teamId, matchesHome, 'home');
    return balance;
  }
  if (performance === 'away') {
    const matchesAway = matches
      .filter((match) => match.awayTeamId === teamId);
    const balance = goalsFavor(teamId, matchesAway, 'away')
    - goalsOwn(teamId, matchesAway, 'away');
    return balance;
  }
  const balance = goalsFavor(teamId, matches, 'general')
  - goalsOwn(teamId, matches, 'general');
  return balance;
};
export default goalsBalance;
