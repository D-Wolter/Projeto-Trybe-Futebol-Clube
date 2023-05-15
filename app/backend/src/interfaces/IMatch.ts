interface IMatch {
  id?: number,
  inProgress?: boolean,
  awayTeamId: number,
  awayTeamGoals: number,
  homeTeamId: number,
  homeTeamGoals: number,
}

export default IMatch;
