import { Router, Request, Response } from 'express';
import MatcheController from '../controllers/matchController';
import MatchService from '../services/matchesService';
import authToken from '../middlewares/validateToken';

const matchRouter = Router();
const matcherRouter = new MatchService();
const matcherController = new MatcheController(matcherRouter);

matchRouter.get(
  '/',
  (req: Request, res: Response) => matcherController.getAll(req, res),
);

matchRouter.post(
  '/',
  authToken,
  (req: Request, res: Response) => matcherController.insertMatch(req, res),
);

matchRouter.patch(
  '/:id',
  authToken,
  (req: Request, res: Response) => matcherController.uploadInProgressData(req, res),
);

matchRouter.patch(
  '/:id/finish',
  authToken,
  (req: Request, res: Response) => matcherController.uploadInProgress(req, res),
);

export default matchRouter;
