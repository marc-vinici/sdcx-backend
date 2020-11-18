const Subject = require('../models/Subject')
const User = require('../models/User')
const Obrien = require('../models/Obrien')
const Hrv = require('../models/Hrv')

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

            const subject = await Subject.findOne({ '_id': req.query.subjectId})

            switch (req.params.type) {
                case 'obrien':
                    exam = await Obrien.findOne({ '_id': req.query.examId})
                    break;
                case 'hrv':
                    exam = await Hrv.findOne({ '_id': req.query.examId})
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
            //const subject = await Subject.findOne({ '_id': req.query.subjectId })
            
            // const subjects = await Subject.find({'id_user':req.userId})

            // subjects.map((sub)=>{
            //     const obriens  = await Obrien.find({ 'id_subject': sub['_id']})
            //     const hrsv = await Hrv.find({ 'id_subject': sub['_id']})
            // })
            // let exams
            // switch (req.params.type) {
            //     case 'obrien':
            //         exams = await Obrien.find({ 'id_subject': req.query.subjectId})
            //         break;
            //     case 'hrv':
            //         exams = await Hrv.find({ 'id_subject': req.query.subjectId})
            //         break;
            //     case 'brs':
            //         break;
            //     default: break;
            // }
             const hrvs = await Hrv.find({'id_subject': req.params.subjectId})
             const obriens = await Obrien.find({'id_subject': req.params.subjectId})

            // if(!(hravs && obriens)){
            //     return res.status(400).json({ error: "Subject does not have exams" });
            // }
            //retuenres.status(status).json(obj)
            return res.json([{obriens}, {hrvs}])
        } catch (err) {
            return res.status(400).json({ error: "Users index failed" });
        }
    },

    async update(req, res) {
        try {
            
            let exam = await Exam.findOne({'_id':req.params.id})

            if (exam) {
                exam['comments'].push(req.body)
                await exam.save()
            }

            return res.json({ exam })
        } catch (err) {
            return res.status(400).json({ error: "User update failed" });
        }
    }
}