const express = require ('express')
const bodyParser = require ('body-parser')
const api = require ('./server/routes/api')
const mongoose = require ('mongoose')
const path = require ('path')

const app = express()
const PORT = 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))

mongoose.connect('mongodb://localhost/meeTravelDB',{useNewUrlParser:true},()=>console.log("Mongo is running"))

app.use(express.static(path.join(__dirname,'./dist')))
app.use(express.static(path.join(__dirname,'./node_modules')))

app.use('/',api)


app.get('/status', (req, res) => {res.send('Still alive')})
app.listen(process.env.PORT || PORT,()=>console.log(`Running server on port: ${PORT}`))