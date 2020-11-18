
const User = require('../models/User')


module.exports = {
    async authenticate(req, res) {
        try {
            const { username="", email="", password } = req.body;
            const user = await User.findOne({ $or: [{ email }, { username }] });

            if (!user) {
                return res.status(400).json({ error: "User not found" });
            }

            if (!(await user.compareHash(password))) {
                return res.status(400).json({ error: "Invalid password" });
            }

            return res.json({
                user,
                token: user.generateToken()
            });
            
        } catch (err) {
            return res.status(400).json({ error: "User authentication failed", mes: err });
        }
    }
}