import IMatch from './IMatch';
import IMatchOutput from './IMatchStatus';
import IMatchInProgress from './IMatchProgress';

interface IMatchService {
  getAll(): Promise<IMatchOutput[]>;

  readInProgress(progress: string): Promise<IMatchOutput[]>;

  insertMatch(match: IMatch): Promise<IMatch>;

  getTeamsMatch(homeTeamId: number, awayTeamId:number): Promise<number>;

  uploadInProgress(id: number): Promise<string>;

  uploadInProgressData(matchInProgress: IMatchInProgress): Promise<IMatchInProgress>;
}

export default IMatchService;
