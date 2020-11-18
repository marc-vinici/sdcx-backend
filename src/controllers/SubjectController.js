const Subject = require('../models/Subject')
const Obrien = require('../models/Obrien')
const Hrv = require('../models/Hrv');
const User = require('../models/User');

// To do: update and destroy

module.exports = {
    async store(req, res) {
        
        try {
            const { name } = req.body;
            
            if (await Subject.findOne({name : 'name'})) {
                return res.status(400).json({ error: "Subject already exists" });
            }

            const subject = await Subject.create(req.body);

            return res.json({ subject });
        } catch (err) {
            return res.status(400).json({ error: "Subject registration failed" });
        }
    },

    async show(req, res) {
        try {

            if (!(await Subject.findOne({ 'id_user': req.userId }))) {
                return res.status(400).json({ error: "User does not have subjects" });
            }

            let exam
            const subject = await Subject.findOne({ 'name': req.query.name })

            switch (req.params.type) {
                case 'obrien':
                    exam = await Obrien.findOne({ 'id_subject': subject['_id'] })
                    break;
                case 'hrv':
                    exam = await Hrv.findOne({ 'id_subject': subject['_id'] })
                    break;
                case 'brs':
                    break;
                default: break;
            }


            return res.json([{ subject }, { exam }])
        } catch (err) {
            return res.status(400).json({ error: "Users index failed" });
        }
    },

    async index(req, res) {
        try {
            
            let subjects
            const user = await User.findById(req.userId)

            if(user['isAdmin']){
                subjects = await Subject.find()
            }else{
                subjects = await Subject.find({ 'id_user': req.userId })
            }
            
            return res.json({ subjects })

        } catch (err) {
            return res.status(400).json({ error: "Users index failed" });
        }
    }
}