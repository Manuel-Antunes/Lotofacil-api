import User from '../models/User'
import * as Yup from "yup";
import { addDays } from 'date-fns';
class UserController {
    async index(req, res) {
        const users = await User.findAll({
            where: {
                loto_fk: req.query.loto
            },
            attributes: ['name', 'id', 'email', 'cpf', 'telefone', 'admin', 'login', 'remaining_days', "contract_date", "contract_expires"],
            limit: 20,
            offset: (req.query.page - 1) * 20
        });
        const size = await User.count();
        return res.json({
            users,
            size
        });
    }
    async get(req, res) {
        const user = await User.findByPk(req.params.id, {
            attributes: ['name', 'email', 'cpf', 'telefone', 'admin', 'login']
        });
        return res.json(user);
    }
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            login: Yup.string().required(),
            cpf: Yup.string().required(),
            email: Yup.string().email().required(),
            telefone: Yup.string().required(),
            password: Yup.string().required().min(8),
            loto_fk: Yup.number().required()
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(401).json({ error: "Validation fails" })
        }
        const userExists = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (userExists) {
            return res.status(400).json({ error: "User already exists" });
        }
        const userExists2 = await User.findOne({
            where: {
                login: req.body.login
            }
        });
        if (userExists2) {
            return res.status(400).json({ error: "User already exists" });
        }


        const { id, name, telefone, email, cpf, login, lotoUserFk, admin, remaining_days } = await User.create(req.body)

        return res.json({
            id,
            name,
            email,
            telefone,
            cpf,
            login,
            lotoUserFk,
            admin,
            remaining_days
        })
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            password: Yup.string().min(8),
            confirmPassword: Yup.string().when('password', (password, field) => {
                password ? field.required().oneOf([Yup.ref('password')]) : field;
            })
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(401).json({ error: "Validation fails" })
        }
        const user = await User.findByPk(req.params.id);

        await user.update(req.body);
        return res.json({ ok: true });
    }
    async contrat(req, res) {
        const plan = req.params.plan;
        const user = await User.findOne({
            where: { id: req.query.id }
        });
        if (plan == "1") {
            const a = await user.update({ contract_date: new Date(), contract_expires: addDays(new Date(), 30) });
            return res.json({ contract_date: new Date(), contractExpires: addDays(new Date(), 30) });
        } else if (plan == "2") {
            await user.update({ contract_date: new Date(), contract_expires: addDays(new Date(), 120) });
            return res.json({ contractExpires: addDays(new Date(), 120) });
        } else if (plan == "3") {
            await user.update({ contract_date: new Date(), contract_expires: addDays(new Date(), 365) });
            return res.json({ contractExpires: addDays(new Date(), 365) });
        } else if (plan == "4") {
            await user.update({ contract_date: new Date(), contract_expires: addDays(new Date(), 100000) });
            return res.json({ contractExpires: addDays(new Date(), 100000) });
        }
    }
    async check(req, res) {
        const { onze, doze, treze, quatorze, quinze } = req.body;
        const user = await User.findOne({
            where: { id: req.userId }
        });
        const updated = await user.update({
            onze_pontos: onze + user.onze_pontos,
            doze_pontos: doze + user.doze_pontos,
            treze_pontos: treze + user.treze_pontos,
            quatorze_pontos: quatorze + user.quatorze_pontos,
            quinze_pontos: quinze + user.quinze_pontos
        });
        return res.json(updated);
    }
    async delete(req, res) {
        const deleted = await User.destroy({
            where: { id: req.query.id }
        })
        return res.json({ ok: true });
    }
}

export default new UserController();