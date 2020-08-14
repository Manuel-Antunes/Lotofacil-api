"use strict"; function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _auth = require('../../config/auth'); var _auth2 = _interopRequireDefault(_auth);
class SessionController {
    async store(req, res) {
        const schema = Yup.object().shape({
            login: Yup.string().required(),
            password: Yup.string().required(),
            loto_fk: Yup.number().required()
        });
        console.log(req.body);
        if (!(await schema.isValid(req.body))) {
            return res.status(401).json({ error: "Validation fails" })
        }
        const { login, password, loto_fk } = req.body;
        var user = await _User2.default.findOne({ where: { email: login, loto_fk } });
        if (!user) {
            const Nowuser = await _User2.default.findOne({ where: { login, loto_fk } });
            if (!Nowuser) {
                return res.status(400).json({ error: "user no found" });
            } else {
                user = Nowuser;
            }
        }
        if (!(await user.checkPassword(password))) {
            return res.status(401).json({ error: 'Password does not match' });
        }
        const { id, name, onze_pontos, doze_pontos, treze_pontos, quatorze_pontos, quinze_pontos, admin, remaining_days } = user;
        return res.json({
            user: {
                id,
                name,
                login,
                onze: onze_pontos,
                doze: doze_pontos,
                treze: treze_pontos,
                quatorze: quatorze_pontos,
                quinze: quinze_pontos,
                admin,
                remaining_days
            },
            token: _jsonwebtoken2.default.sign({ id }, _auth2.default.secret, {
                expiresIn: _auth2.default.expiresIn
            })
        })
    }
}
exports. default = new SessionController();