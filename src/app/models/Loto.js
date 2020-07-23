import { Model } from 'sequelize';
import Sequelize from 'sequelize';

class Loto extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING
        }, {
            sequelize,
        });
    }
    static associate(models) {
        this.hasMany(models.user, { as: 'users' });
    }
}
export default Loto;