import User from '../models/User';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup'
import authConfig from '../../config/auth'
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
        var user = await User.findOne({ where: { email: login, loto_fk } });
        if (!user) {
            const Nowuser = await User.findOne({ where: { login, loto_fk } });
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
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            })
        })
    }
}
export default new SessionController();