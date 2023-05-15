import { Router } from 'express';
import teamsRouter from './teamsRouter';
import loginRouter from './userRouter';
import matchRouter from './matchesRouter';

const routers = Router();

routers.use('/login', loginRouter);
routers.use('/teams', teamsRouter);
routers.use('/matches', matchRouter);

export default routers;
