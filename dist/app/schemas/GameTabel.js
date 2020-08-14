"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

const GameTabelSchema = new _mongoose2.default.Schema({
    games: {
        type: Object,
        required: true,
    },
    user: {
        type: Number,
        required: true
    },
    gain: {
        type: Number,
        required: false,
        default: null
    },
    checked: {
        type: Boolean,
        required: false,
        default: false
    }
}, {
    timestamps: true
});

exports. default = _mongoose2.default.model("GameTabel", GameTabelSchema);