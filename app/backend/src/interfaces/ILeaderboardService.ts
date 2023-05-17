import ILeaderboard from './ILeaderboard';

export default interface ILeaderboardService {
  homePerfomance(): Promise<ILeaderboard[]>
  awayPerfomance(): Promise<ILeaderboard[]>
  getFullLeaderboard(): Promise<ILeaderboard[]>
}
