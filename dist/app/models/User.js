"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _datefns = require('date-fns');
class User extends _sequelize.Model {
    static init(sequelize) {
        super.init({
            name: _sequelize2.default.STRING,
            email: _sequelize2.default.STRING,
            login: _sequelize2.default.STRING,
            telefone: _sequelize2.default.STRING,
            cpf: _sequelize2.default.STRING,
            password: _sequelize2.default.VIRTUAL,
            password_hash: _sequelize2.default.STRING,
            contract_date: _sequelize2.default.DATE,
            contract_expires: _sequelize2.default.DATE,
            loto_fk: _sequelize2.default.INTEGER,
            onze_pontos: _sequelize2.default.INTEGER,
            doze_pontos: _sequelize2.default.INTEGER,
            treze_pontos: _sequelize2.default.INTEGER,
            quatorze_pontos: _sequelize2.default.INTEGER,
            quinze_pontos: _sequelize2.default.INTEGER,
            admin: _sequelize2.default.BOOLEAN,
            remaining_days: {
                type: _sequelize2.default.VIRTUAL,
                get() {
                    return this.contract_date ? _datefns.differenceInDays.call(void 0, this.contract_expires, _datefns.add.call(void 0, this.contract_date, _datefns.parseISO.call(void 0, new Date().getDate))) : 0;
                }
            },
        }, {
            sequelize,
        });
        this.addHook('beforeSave', async (user) => {
            if (user.password) {
                user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
            }
        });
    };
    checkPassword(password) {
        return _bcryptjs2.default.compare(password, this.password_hash);
    }
}
exports. default = User;