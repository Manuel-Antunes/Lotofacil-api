import User from '../models/User';

export default async(req, res, next) => {
    const user = await User.findOne(
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