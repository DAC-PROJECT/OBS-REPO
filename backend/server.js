const express=require('express')
const app=express()
const books=require('./data/books')


app.get('/',(req,res)=>{
    res.send('Api is Running');
})

app.get('/api/books',(req,res)=>{
      res.json(books);  
})


app.get('/api/books/:id',(req,res)=>{
    const book=books.find(p=>p._id===req.params.id)
    res.json(book);  
})
app.listen(5000,console.log('Server running on port 5000'))