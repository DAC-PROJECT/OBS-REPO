const express = require('express')
const router = express.Router()
//getting the schema of the database
const Book = require('../models/book')

//Single Select code
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        res.json(book)
    } catch (err) {
        res.send('Error' + err)
    }
})
//SelectAll code
router.get('/', async (req, res) => {
    try {
        const books = await Book.find()
        res.json(books)
    } catch (err) {
        res.send('Error' + err)
    }
})

//Insert into code
router.post('/', async (req, res) => {
    const book = new Book(
        {
            _id: req.body.id,
            price: req.body.price,
            name: req.body.name

        }
    )
    try {
        const a1 = await book.save()
        res.json(a1)
    } catch (err) {
        res.send('Error')
    }


})
// update code
router.patch('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        book.price = req.body.price
        const a1 = await book.save()
        res.json(a1)

    } catch (err) {
        res.send('Error')
    }
})
//Delete code
router.delete('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        const a1 = await book.delete()
        res.json(a1)

    } catch (err) {
        res.send('Error')
    }
})




module.exports = router