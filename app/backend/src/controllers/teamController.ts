import { Request, Response } from 'express';
import TeamsService from '../services/teamService';

export default class TeamsController {
  constructor(private teamsService = new TeamsService()) { }

  public getAllTeams = async (req: Request, res: Response) => {
    const teams = await this.teamsService.getAllTeams();
    return res.status(200).json(teams);
  };

  public getTeamById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this.teamsService.getTeamById(id);
    return res.status(200).json(team);
  };
}
