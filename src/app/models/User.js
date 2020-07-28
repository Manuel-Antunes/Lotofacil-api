import { Model } from 'sequelize';
import Sequelize from 'sequelize';
import bcrypt from 'bcryptjs';
import { differenceInDays, add, parseISO } from 'date-fns';
class User extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            login: Sequelize.STRING,
            telefone: Sequelize.STRING,
            cpf: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
            contract_date: Sequelize.DATE,
            contract_expires: Sequelize.DATE,
            loto_fk: Sequelize.INTEGER,
            onze_pontos: Sequelize.INTEGER,
            doze_pontos: Sequelize.INTEGER,
            treze_pontos: Sequelize.INTEGER,
            quatorze_pontos: Sequelize.INTEGER,
            quinze_pontos: Sequelize.INTEGER,
            admin: Sequelize.BOOLEAN,
            remaining_days: {
                type: Sequelize.VIRTUAL,
                get() {
                    return this.contract_date ? differenceInDays(this.contract_expires, add(this.contract_date, parseISO(new Date().getDate))) : 0;
                }
            },
        }, {
            sequelize,
        });
        this.addHook('beforeSave', async (user) => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });
    };
    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}
export default User;