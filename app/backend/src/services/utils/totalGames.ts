import IMatch from '../../interfaces/IMatch';

const totalGames = (teamId: number, matches: IMatch[], performance: string | undefined) => {
  if (performance === 'home') {
    const matchesInHome = matches.filter((match) => match.homeTeamId === teamId);
    return matchesInHome.length;
  }
  if (performance === 'away') {
    const matchesAway = matches.filter((match) => match.awayTeamId === teamId);
    return matchesAway.length;
  }
  return matches.length;
};
export default totalGames;
