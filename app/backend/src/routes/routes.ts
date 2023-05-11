import { Router } from 'express';
import teamsRouter from './teamsRouter';

const routers = Router();

routers.use('/teams', teamsRouter);

export default routers;
