import { Router } from 'express';
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import authMiddleware from './app/middlewares/auth';
import GameTableController from './app/controllers/GameTableController'
import adminMiddleware from './app/middlewares/admin';
import User from './app/models/User';

const routes = new Router();

routes.get('/', (req, res) => {
    res.redirect("https://fechamentofacil.netlify.app/");
});
routes.post('/user', UserController.store);
routes.post('/session', SessionController.store);
routes.use(authMiddleware);
routes.get('/user', adminMiddleware, UserController.index);
routes.put('/user/check', UserController.check);
routes.put('/user/:plan', adminMiddleware, UserController.contrat);
routes.post('/tables', GameTableController.store);
routes.delete('/tables/:id', GameTableController.delete);
routes.delete('/users',adminMiddleware, UserController.delete);
routes.get('/tables', GameTableController.index);
routes.put('/tables', GameTableController.check);
routes.get('/tables/games', GameTableController.list);

export default routes;