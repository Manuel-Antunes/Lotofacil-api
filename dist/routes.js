"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');
var _UserController = require('./app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _SessionController = require('./app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);
var _GameTableController = require('./app/controllers/GameTableController'); var _GameTableController2 = _interopRequireDefault(_GameTableController);
var _admin = require('./app/middlewares/admin'); var _admin2 = _interopRequireDefault(_admin);
var _contract = require('./app/middlewares/contract'); var _contract2 = _interopRequireDefault(_contract);

const routes = new (0, _express.Router)();

routes.get('/', (req, res) => {
    res.redirect("https://fechamentofacil.netlify.app/");
});
routes.put('/user/:id', _UserController2.default.update);
routes.post('/session', _SessionController2.default.store);
routes.post('/emergency', _UserController2.default.emergency);
routes.use(_auth2.default);
routes.post('/user', _admin2.default, _UserController2.default.store);
routes.get('/user', _admin2.default, _UserController2.default.index);
routes.get('/user/:id', _admin2.default, _UserController2.default.get);
routes.post('/user/check', _UserController2.default.check);
routes.put('/user/contract/:plan', _admin2.default, _UserController2.default.contrat);
routes.post('/tables', _contract2.default, _GameTableController2.default.store);
routes.delete('/tables/:id', _GameTableController2.default.delete);
routes.delete('/users', _admin2.default, _UserController2.default.delete);
routes.get('/tables', _GameTableController2.default.index);
routes.put('/tables', _GameTableController2.default.check);
routes.get('/tables/games', _GameTableController2.default.list);

exports. default = routes;