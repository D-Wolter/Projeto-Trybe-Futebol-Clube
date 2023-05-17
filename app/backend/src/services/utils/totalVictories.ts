import IMatch from '../../interfaces/IMatch';

const totalVictories = (teamId: number, matches: IMatch[], performance: string | undefined) => {
  if (performance === 'home') {
    const matchesAtHome = matches
      .filter((match) => match.homeTeamId === teamId && match.homeTeamGoals > match.awayTeamGoals);
    return matchesAtHome.length;
  }
  if (performance === 'away') {
    const matchesAway = matches
      .filter((match) => match.awayTeamId === teamId && match.awayTeamGoals > match.homeTeamGoals);
    return matchesAway.length;
  }
  return matches.length;
};
export default totalVictories;
