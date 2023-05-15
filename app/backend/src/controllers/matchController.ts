import { Request, Response } from 'express';
import IMatchService from '../interfaces/IMatchService';

class MatcheController {
  private _service: IMatchService;
  constructor(service: IMatchService) {
    this._service = service;
  }

  async getAll(req: Request, res: Response) {
    const progress = req.query.inProgress as string;
    if (progress === 'true' || progress === 'false') {
      const inProgress = await this._service.readInProgress(progress);
      return res.status(200).json(inProgress);
    }
    const result = await this._service.getAll();
    return res.status(200).json(result);
  }

  async insertMatch(req: Request, res: Response) {
    const { awayTeamId, awayTeamGoals, homeTeamId, homeTeamGoals } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }

    const teamsMatch = await this._service.getTeamsMatch(homeTeamId, awayTeamId);
    if (teamsMatch < 2) {
      return res.status(404).json({
        message: 'There is no team with such id!' });
    }

    const inserted = await this._service.insertMatch({
      awayTeamId,
      awayTeamGoals,
      homeTeamId,
      homeTeamGoals,
    });
    return res.status(201).json(inserted);
  }

  async uploadInProgress(req: Request, res: Response) {
    const { id } = req.params;
    const uploaded = await this._service.uploadInProgress(Number(id));
    return res.status(200).json({ message: uploaded });
  }

  async uploadInProgressData(req: Request, res: Response) {
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { id } = req.params;
    const uploadedData = await this._service.uploadInProgressData({
      id: Number(id),
      homeTeamGoals: Number(homeTeamGoals),
      awayTeamGoals: Number(awayTeamGoals),
    });
    return res.status(200).json(uploadedData);
  }
}

export default MatcheController;
