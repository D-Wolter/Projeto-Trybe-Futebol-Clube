import { Router } from 'express';
import teamsRouter from './teamsRouter';
import loginRouter from './userRouter';
import matchRouter from './matchesRouter';
import leaderboardRoutes from './leaderboardRouter';

const routers = Router();

routers.use('/login', loginRouter);
routers.use('/teams', teamsRouter);
routers.use('/matches', matchRouter);
routers.use('/leaderboard', leaderboardRoutes);

export default routers;
