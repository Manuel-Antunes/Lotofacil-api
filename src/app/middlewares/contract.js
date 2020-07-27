import User from '../models/User';

export default async (req, res, next) => {
    const user = await User.findOne({
        where: {
            id: req.userId
        }
    });
    if (!user.remaining_days > 0) {
        return res.status(400).json({ error: "User contract is expired" });
    }
    next();
}