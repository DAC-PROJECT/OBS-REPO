const express = require('express')
const mongoose = require('mongoose')

//database connectivity path
const url = 'mongodb://localhost/OBSteam'
// creating object of express
const app = express()
//connecting to the database
mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection
//to check whether connection established or not
con.on('open', function () {
    console.log("Mongodb guyssss connected ....")
})
app.use(express.json())

// to call the tables operation defined in routes
const alienRouter = require('./routes/books')
app.use('/books', alienRouter)


//listening to the server
app.listen(9000, function () {
    console.log("server started");
})