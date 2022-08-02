const mongoose= require('mongoose')

const ImageSearchSchema= new mongoose.Schema({
    productId:
    {
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Products'
    },
    
    featureVector:{
        type: Array, 
        required: true
    },

   
},
    {
        timestamps:true
    }
)

module.exports=mongoose.model('ImageSearch',ImageSearchSchema);