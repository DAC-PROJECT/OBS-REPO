import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import {notFound,errorHandler} from './middleware/errorMiddleware.js'
import connectDb from './config/db.js'
import bookRoutes from './routes/booksRoutes.js'

dotenv.config()
connectDb()
const app=express()
 
app.get('/',(req,res)=>{
    res.send('Api is Running');
})


app.use('/api/books',bookRoutes)

app.use(notFound)

app.use(errorHandler)

const PORT =process.env.PORT || 5000

app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow))