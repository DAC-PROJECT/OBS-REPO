import asyncHandler from 'express-async-handler'
import Book from '../models/bookModel.js'



//@desc Fetch all books
//@route Get /api/books
//@access public
const getBooks=asyncHandler(async(req,res)=>{

    const books = await Book.find({})
    res.json(books); 

})



//@desc Fetch single book
//@route Get /api/books/:id
//@access public
const getBookById=asyncHandler(async(req,res)=>{

    const book=await Book.findById(req.params.id)
    if(book){
   res.json(book);
   }  else{
       res.status(404)
       throw new Error('Book not found')
   }

})



export{
    getBooks,
    getBookById
}