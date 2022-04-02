import { Router } from 'express';
import authRouter from '../controllers/auth-controller';
import portfolioRouter from '../controllers/portfolio-controller';
import usersRouter from '../controllers/user-controller';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/auth', authRouter);
routes.use('/portfolio', portfolioRouter)

export default routes;

