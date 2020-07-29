import { Router } from 'express';
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import authMiddleware from './app/middlewares/auth';
import GameTableController from './app/controllers/GameTableController'
import adminMiddleware from './app/middlewares/admin';
import contractMiddleware from './app/middlewares/contract';

const routes = new Router();

routes.get('/', (req, res) => {
    res.redirect("https://fechamentofacil.netlify.app/");
});
routes.put('/user/:id', UserController.update);
routes.post('/session', SessionController.store);
routes.use(authMiddleware);
routes.post('/user', adminMiddleware, UserController.store);
routes.get('/user', adminMiddleware, UserController.index);
routes.get('/user/:id', adminMiddleware, UserController.get);
routes.post('/user/check', UserController.check);
routes.put('/user/contract/:plan', adminMiddleware, UserController.contrat);
routes.post('/tables', contractMiddleware, GameTableController.store);
routes.delete('/tables/:id', GameTableController.delete);
routes.delete('/users', adminMiddleware, UserController.delete);
routes.get('/tables', GameTableController.index);
routes.put('/tables', GameTableController.check);
routes.get('/tables/games', GameTableController.list);

export default routes;