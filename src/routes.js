const express = require('express')
const UserController = require('./controllers/UserController')
const SubjectController = require('./controllers/SubjectController')
const LoginController = require('./controllers/LoginController')
const ExamController = require('./controllers/ExamController')
//const ContactController = require('./controllers/ContactController')
//const ShareController = require('./controllers/ShareController')

const authMiddleware = require("./middlewares/auth");

const routes = express.Router()

routes.get('/',(req, res) => {
    return res.send("SDCx")
})

routes.post('/login', LoginController.authenticate)

routes.get('/subjects', authMiddleware, SubjectController.index)

routes.get('/subjects/:subjectId', authMiddleware, ExamController.index)

routes.get('/exams/:type', authMiddleware, ExamController.show) //params.type -> obrien, hrv..; query.subjectId ; query.examId
//routes.put('/exams/:id', authMiddleware, ExamController.update) // params.id -> examId


routes.get('/admin/map')

routes.post('/admin/users', authMiddleware, UserController.store)
routes.get('/admin/users', authMiddleware, UserController.index)
routes.put('/admin/users', authMiddleware, UserController.update)


// routes.get('/contacts', authMiddleware, ContactController.index)
// routes.put('/contacts/:username', authMiddleware, ContactController.update)
// routes.delete('/contacts/:id', authMiddleware, ContactController.destroy) // params.id-> contactId

// routes.get('/share', authMiddleware, ShareController.index)
// routes.put('/share/:id', authMiddleware, ShareController.update ) // query.id -> subject_id
// routes.delete('/share/:id', authMiddleware, ShareController.destroy)

// Rotas do isnominia

routes.post('/users',authMiddleware, UserController.store)
routes.get('/users', UserController.index)


routes.post('/subjects', authMiddleware, SubjectController.store)


module.exports = routes