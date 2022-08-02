const mongoose= require('mongoose')

const SellerSchema= new mongoose.Schema({

         pid:{ type: String, required: true },
          name: { type: String, required: true },
          imageURL: { type: String, required: true },
          price: { type: Number, required: true },
          
          sellerId: {
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            ref:'Register'
         },

          qty: { type: Number, required: true },
          
          orderId: { 
              type:mongoose.Schema.Types.ObjectId,
              required: true,
              ref:'Order'
            },

          buyerId: { 
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            ref:'Register'
            },


          
       
   
},
    {
        timestamps:true
    }
)

module.exports=mongoose.model('Seller',SellerSchema);