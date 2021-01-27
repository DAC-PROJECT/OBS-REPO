import mongoose from 'mongoose'

const reviewSchema=mongoose.Schema({
    name:{ type:String, required:true},
    rating:{type:Number,required:true},
   comment:{type:String,required:true},
     user :{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
},
{
    timestamps:true,
})

const bookSchema=mongoose.Schema({
    user :{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
    },
    writer:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        default:0
    },
    pages:{
        type:Number,
        required:true,
        default:0
    },
    countInStock:{
        type:Number,
        required:true,
        default:0
    },
    rating:{
        type:Number,
        required:true,
        default:0
    },
    numReviews:{
        type:Number,
        required:true,
        default:0
    },
    publication:{
        type:String,
        required:true,
        default:'publication_name'
    },
     reviews:[reviewSchema],
     
},{
    timestamps:true
})


const Book =mongoose.model('Book',bookSchema)

export default Book