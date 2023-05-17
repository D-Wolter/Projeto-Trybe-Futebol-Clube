import ILeaderboard from '../../interfaces/ILeaderboard';

const sortTable = (table: ILeaderboard[]) => {
  const orderTable = table.sort((a, b) => (b.totalPoints - a.totalPoints)
    || (b.totalVictories - a.totalVictories)
    || (b.goalsBalance - a.goalsBalance) || (b.goalsFavor - a.goalsFavor)
    || (b.goalsOwn - a.goalsOwn));

  return orderTable;
};
export default sortTable;
