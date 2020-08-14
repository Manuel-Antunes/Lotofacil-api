"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

exports. default = async(req, res, next) => {
    const user = await _User2.default.findOne(
        {
            where: {
                id: req.userId
            }
        }
    )
    if (!user.admin) {
        return res.status(401).json({ error: "o usuario não é um administrador" })
    }
    next();
}