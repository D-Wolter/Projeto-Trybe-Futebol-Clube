import { Router } from 'express';
import TeamsController from '../controllers/teamController';

const teamsRouter = Router();
const teamController = new TeamsController();

teamsRouter.get('/', teamController.getAllTeams);
teamsRouter.get('/:id', teamController.getTeamById);

export default teamsRouter;
