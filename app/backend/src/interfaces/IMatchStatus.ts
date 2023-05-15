interface IMatchStatus {
  id?: number,
  inProgress: boolean,
  awayTeamId?: number,
  awayTeamGoals: number,
  awayTeam?: { teamName: string },
  homeTeamId?: number,
  homeTeamGoals: number,
  homeTeam?: { teamName: string },
}

export default IMatchStatus;
