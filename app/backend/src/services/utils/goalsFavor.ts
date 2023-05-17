import IMatch from '../../interfaces/IMatch';

const goalsFavor = (teamId: number, matches: IMatch[], performance: string | undefined) => {
  if (performance === 'home') {
    const matchesHome = matches
      .filter((match) => match.homeTeamId === teamId);
    const goalFavor = matchesHome.reduce((goals, match) => goals + match.homeTeamGoals, 0);
    return goalFavor;
  }
  if (performance === 'away') {
    const matchesAway = matches
      .filter((match) => match.awayTeamId === teamId);
    const goalFavor = matchesAway.reduce((goals, match) => goals + match.awayTeamGoals, 0);
    return goalFavor;
  }
  const goalFavor = matches.reduce((goals, match) => goals + match.homeTeamGoals, 0);
  return goalFavor;
};
export default goalsFavor;
