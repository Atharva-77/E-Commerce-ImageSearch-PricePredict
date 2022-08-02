const mongoose= require('mongoose')

const RegisterSchema= new mongoose.Schema({
    Name:
    {
        type:String,
        required: true,
    },
    email:
    {
        type:String,
        required: true,
        unique: true
    },

    password:
    {
        type: String,
        required: true,
        // minlength: 5
    },


    // confirmPassword:
    // {
    //     type: String,
    //     required: true
    // },

    isAdmin:
    {
        type: Boolean,
        default:false
    },

    isSeller:
    {
        type: Boolean,
        default:false
    }
    
},
    {
        timestamps:true
    }
)

module.exports=mongoose.model('Register',RegisterSchema);
// See how modelname is defined

// https://www.xspdf.com/resolution/53089876.html#:~:text=in%20your%20schema.-,What%20mongoose%20do%20is%20that%2C%20When%20no%20collection%20argument%20is,%3A%20'actor'%20%7D)%3B%20or.