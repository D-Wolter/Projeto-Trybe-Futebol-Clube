import IMatch from '../../interfaces/IMatch';

const totalLosses = (teamId: number, matches: IMatch[], performance: string | undefined) => {
  if (performance === 'home') {
    const matchesHome = matches
      .filter((match) => match.homeTeamId === teamId && match.homeTeamGoals < match.awayTeamGoals);
    return matchesHome.length;
  }
  if (performance === 'away') {
    const matchesAway = matches
      .filter((match) => match.awayTeamId === teamId && match.awayTeamGoals < match.homeTeamGoals);
    return matchesAway.length;
  }
  return matches.length;
};
export default totalLosses;
