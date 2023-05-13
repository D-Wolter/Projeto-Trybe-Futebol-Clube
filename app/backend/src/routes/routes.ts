import { Router } from 'express';
import teamsRouter from './teamsRouter';
import loginRouter from './userRouter';

const routers = Router();

routers.use('/login', loginRouter);
routers.use('/teams', teamsRouter);

export default routers;
