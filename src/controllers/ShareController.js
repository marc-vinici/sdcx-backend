// index, show, store, update, destroy

const User = require('../models/User')
const Subject = require('../models/Subject')

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
            //let user = await User.findOne({'_id': req.userId})
            let contact = await User.findOne({'_id': req.params.id })
            const share = await Subject.findOne({'_id' : req.query.subjectId})

            if (contact) {

                contact['id_shares'].push(share['_id'])
                await contact.save()
            }

            return res.json({ contact })
        } catch (err) {
            console.log(err)
            return res.status(400).json({ error: "User update failed" });
        }
    },

    async destroy(req, res){
        try {
            let user = await User.findOne({'_id' : req.userId})
            if(user['id_shares'].lenght > 0){
                user['id_shares'].splice(user['id_shares'].indexOf(req.params.id),1)
            
                await user.save()
            }
            return res.json({ user})
         
        } catch (error) {
            return res.status(400).json({ error: "Share update failed" });
        }
    }
}