import { Request, Response, Router } from 'express';
import LearderboardService from '../services/leaderboardService';
import LeaderboardController from '../controllers/leaderboardController';

const leaderboardRoutes = Router();

const leaderboardService = new LearderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

leaderboardRoutes
  .get(
    '/home',
    (req: Request, res: Response) => leaderboardController.HomeLeaderboardData(req, res),
  );

leaderboardRoutes
  .get(
    '/away',
    (req: Request, res: Response) => leaderboardController.AwayLeaderboardData(req, res),
  );
leaderboardRoutes
  .get(
    '/',
    (req: Request, res: Response) => leaderboardController.LeaderboardData(req, res),
  );
export default leaderboardRoutes;
