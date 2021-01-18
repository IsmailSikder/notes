//importing express and body-parset
const express = require('express')
const   bodyParser = require('body-parser')
//import express router

const app = express()

let Router = express.Router()

//importing routes
let apiRoutes = require('./routes/notes.routes')(Router)


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

let PORT = process.env.port || 3000
app.listen(PORT,()=>console.log('Listening to '+PORT))

//default routes
app.get('/',(req,res)=>{
    console.log('Notes Application')
    res.json({
        status:"Success",
        message:"notes application"
    })
})


//using routes 
app.use('/api',apiRoutes)

//configuring the database
const dbconfig = require('./config/database.config')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

//connection to database 
mongoose.connect(dbconfig.url, {
    useNewUrlParser : true
})
.then(()=>console.log('successfully connected to the db'))
.catch((err)=>{console.log('could not connect to database ', err)
process.exit()
})