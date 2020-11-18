// index, show, store, update, destroy

const User = require('../models/User')

module.exports = {
    async store(req, res) {
        const { email, username } = req.body;

        try {
          
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
            const user  = await User.findOne({'_id':  req.userId })

            const contacts = await User.find({'_id': {$in :user['id_contacts']}})

            return res.json({ contacts })
        } catch (err) {
            return res.status(400).json({ error: "Users does not have contacts" });
        }
    },

    async update(req, res) {
        try {
            let user = await User.findOne({'_id': req.userId})
            const contact = await User.findOne({'username': req.params.username })

            if (contact) {

                user['id_contacts'].push(contact['_id'])
                contact['id_contacts'].push(user['_id'])

                await user.save()
                await contact.save()
            }

            return res.json({ user, contact })
        } catch (err) {
            return res.status(400).json({ error: "User update failed" });
        }
    },

    async destroy(req, res){
        try {
            let user = await User.findOne({'_id' : req.userId})
            let contact = await User.findOne({'_id': req.params.id })

            user['id_contacts'].splice(user['id_contacts'].indexOf(req.params.id),1)
            contact['id_contacts'].splice(contact['id_contacts'].indexOf(user['_id']),1)
            
            await user.save()
            await contact.save()

            return res.json({ user, contact})
         
        } catch (error) {
            return res.status(400).json({ error: "Contact update failed" });
        }
    }
}