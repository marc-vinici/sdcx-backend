require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const cors = require('cors')
const routes = require('./routes')

const app = express()

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false
}) 

// req.query = Acessar query params (p/ filtros)
// req.params = Acessar route params (p/ edição e delete)
// req.body = Acessar corpo da requisição (p/ criação, edição)
app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
app.use(routes)

app.listen(process.env.PORT || 7000)