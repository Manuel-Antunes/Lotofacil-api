"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

exports. default = async (req, res, next) => {
    const user = await _User2.default.findOne({
        where: {
            id: req.userId
        }
    });
    if (!user.remaining_days > 0) {
        return res.status(400).json({ error: "User contract is expired" });
    }
    next();
}