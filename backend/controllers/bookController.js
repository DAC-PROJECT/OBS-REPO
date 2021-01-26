import asyncHandler from 'express-async-handler'
import Book from '../models/bookModel.js'



//@desc Fetch all books
//@route Get /api/books
//@access public
const getBooks=asyncHandler(async(req,res)=>{
    const pageSize = 4
    const page = Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i'   ,
        }
    } : {}

    const count = await Book.countDocuments({...keyword})
    const books = await Book.find({...keyword}).limit(pageSize).skip(pageSize*(page-1))
    res.json({books, page, pages: Math.ceil(count/pageSize)} ); 

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


//@desc Delete book
//@route DELETE  /api/books/:id
//@access Private/Admin
const deleteBook=asyncHandler(async(req,res)=>{

    const book=await Book.findById(req.params.id)
    if(book){
        await book.remove()
        res.json({message: 'Book removed'})
   }  else{
       res.status(404)
       throw new Error('Book not found')
   }

})

//@desc Create book
//@route POST /api/books
//@access Private/Admin
const createBook=asyncHandler(async(req,res)=>{
const book = new Book({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    writer:'abc',
    publication:'Sample publication',
    genre:'Fiction',
    countInStock:0,
    numReviews:0,
    description:'Sample description', 

})

const createdBook = await book.save()
res.status(201).json(createdBook)
})

//@desc Update book
//@route PUT /api/books/:id
//@access Private/Admin
const updateBook=asyncHandler(async(req,res)=>{
   const{name,price,description,image,writer,genre,publication,countInStock,} = req.body

    const book = await Book.findById(req.params.id)

    if(book){
        book.name = name
        book.price=price
        book.description=description
        book.image=image
        book.writer=writer
        book.genre=genre
        book.publication=publication
        book.countInStock=countInStock

        const updatedBook = await book.save()
        res.json(updatedBook)
    }
    else{
        res.status(404)
        throw new Error('Book not found')
    }

    })

//@desc Create new review
//@route POST /api/books/:id/reviews
//@access Private
const createBookReview=asyncHandler(async(req,res)=>{
    const{rating, comment} = req.body
 
     const book = await Book.findById(req.params.id)
 
     if(book){
       const alreadyReviewed = book.reviews.find(r => r.user.toString() === 
       req.user._id.toString())

       if(alreadyReviewed){
           res.status(400)
           throw new Error('Product already reviewed')
       } 
        const review = {
            name:req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        }
        book.reviews.push(review)

        book.numReviews = book.reviews.length

        book.rating = book.reviews.reduce((acc,item) => item.rating + acc,0)/book.reviews.length

            await book.save() 
            res.status(201).json({message:'Review added'})

    } 
     else{
         res.status(404)
         throw new Error('Book not found')
     }
 
     })

export{
    getBooks,
    getBookById,
    deleteBook,
    createBook,
    updateBook,
    createBookReview,
}