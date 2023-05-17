import { Request, Response } from 'express';
import ILeaderboardService from '../interfaces/ILeaderboardService';

export default class Leadrboard {
  private _service: ILeaderboardService;

  constructor(service: ILeaderboardService) {
    this._service = service;
  }

  async HomeLeaderboardData(_req: Request, res: Response) {
    const result = await this._service.homePerfomance();

    return res.status(200).json(result);
  }

  async AwayLeaderboardData(_req: Request, res: Response) {
    const result = await this._service.awayPerfomance();

    return res.status(200).json(result);
  }

  async LeaderboardData(_req: Request, res: Response) {
    const fullLeaderboard = await this._service.getFullLeaderboard();

    res.status(200).json(fullLeaderboard);
  }
}
