const mongoose= require('mongoose')
const ReviewSchema=new mongoose.Schema({
    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Register'
    },

    name: //required? because user is there above
    {
        type: String, 
        required: true
    },

    IndividualRating:
    {
        type: Number,
        required: true
    },

    comment:
    {
        type: String,
        required: true
    },

},
    {
        timestamps: true
    }
)



const ProductSchema= new mongoose.Schema({
    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Register'
    },

    category:
    {
        type: String, //maybe dropdown or let user enter..
        required: true
    },

    name:
    {
        type: String,
        required: true,
    },
    imageURL:
    {
        type: String, //Url
        // required: true,
    },
    imageFile:
    {
        data: Buffer,
        contentType: String,
      
    },

    brand:
    {
        type: String,
        required: true,
    },

    description:
    {
        type: String,
        required: true
    },

    Avgrating:
    {
        type: Number,
        required: true,
        default: 0
    },


    noOfReview:
    {
        type: Number,
        required: true,
        default: 0
    },

    price:
    {
        type: Number,
        required: true,
        default: 0
    },
 

    countInStock:
    {
        type: Number,
        required: true,
        default:0
    },

    reviews:[ReviewSchema]
},
    {
        timestamps:true
    }
)

module.exports=mongoose.model('Product',ProductSchema);