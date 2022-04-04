import { Router } from 'express';
import authRouter from '../controllers/auth-controller';
import mailRouter from '../controllers/mail-controller';
import portfolioRouter from '../controllers/portfolio-controller';
import usersRouter from '../controllers/user-controller';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/auth', authRouter);
routes.use('/portfolio', portfolioRouter);
routes.use('/mail', mailRouter)

export default routes;

