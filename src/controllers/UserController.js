// index, show, store, update, destroy

const User = require('../models/User')

// to do: show and destroy

module.exports = {
    async store(req, res) {
        const { email, username } = req.body;

        try {

            const { isAdmin } = await User.findOne({ '_id': req.userId }, 'isAdmin')
            if (!isAdmin) {
                return res.status(400).json({ error: "User must be an admin" });
            }
          
            if (await User.findOne({ $or: [{ email }, { username }] })) {
                return res.status(400).json({ error: "User already exists" });
            }

            const user = await User.create(req.body);

            return res.json({ user });
        } catch (err) {
            return res.status(400).json({ error: "User registration failed" });
        }
    },

    async index(req, res) {
        try {  
            
            const { isAdmin } = await User.findOne({ '_id': req.userId }, 'isAdmin')
            if (!isAdmin) {
                return res.status(400).json({ error: "User must be an admin" });
            }

            const users = await User.find()

            return res.json({ users })
        } catch (err) {
            return res.status(400).json({ error: "Users index failed" });
        }
    },

    async update(req, res) {
        try {
            const { email, username } = req.body
            let user = await User.findOne({ $or: [{ email }, { username }] })

            if (user) {

                for (e in req.body) {
                    user[`${e}`] = req.body[`${e}`]
                }

                await user.save()
            }

            return res.json({ user })
        } catch (err) {
            return res.status(400).json({ error: "User update failed" });
        }
    }
}