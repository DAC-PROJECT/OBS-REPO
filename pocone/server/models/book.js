const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema(
    {
        _id: {
            type: Number,
            required: true
        },

        price:
        {
            type: Number,
            required: true
        },
        name:
        {
            type: String,
            required: true
        }

    }
)
module.exports = mongoose.model('book', bookSchema)