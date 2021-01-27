import express from 'express'
const router=express.Router()
import {
    getBooks,
    getBookById, 
    deleteBook,
    updateBook,
    createBook, 
    createBookReview,
    getTopBooks
    } 
from '../controllers/bookController.js'
import {protect,admin} from '../middleware/authMiddleWare.js'


router.route('/').get(getBooks).post(protect,admin,createBook)
router.route('/:id/reviews').post(protect,createBookReview )
router.get('/top',getTopBooks)

router.route('/:id')
.get(getBookById)
.delete(protect, admin, deleteBook)
.put(protect, admin, updateBook)

router.route('/')
.get(getBooks)
.post(protect,admin,createBook)

router.route('/:id')
.get(getBookById)
.delete(protect,admin,deleteBook)
.put(protect,admin,updateBook)

 
export default router