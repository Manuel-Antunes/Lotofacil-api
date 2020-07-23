import { Router } from 'express';
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import authMiddleware from './app/middlewares/auth';
import GameTableController from './app/controllers/GameTableController'
import app from './app';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Welcome to Omni CLI' }));
routes.get('/user', UserController.index);
routes.post('/user', UserController.store);
routes.post('/session', SessionController.store);
routes.use(authMiddleware);
routes.put('/user/check', UserController.check);
routes.post('/tables', GameTableController.store);
routes.delete('/tables/:id', GameTableController.delete);
routes.get('/tables', GameTableController.index);
routes.put('/tables', GameTableController.check);
routes.get('/tables/games', GameTableController.list);

export default routes;