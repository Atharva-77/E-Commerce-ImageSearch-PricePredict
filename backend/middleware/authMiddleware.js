const jwt = require('jsonwebtoken');
let RegisterDb=require('../schema_model/register')

// const dotenv=require('dotenv')
// dotenv.config({path: '../config_folder/config.env'})

const protect = async(req, res, next)=> {


    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        console.log("Token found");

        try{
            let token=req.headers.authorization.split(' ')[1] //split by space
            const decode=jwt.verify(token,process.env.JWT_SECRET_TOKEN)

            console.log(decode);

            req.user1= await RegisterDb.findById(decode.id).select('-password').select('-confirmPassword')
            // console.log("Auth MIddleware ",req.user1);
            console.log("Auth MIddleware ");
            next()
        }

        catch(error){

        res.status(401).send("Fail. No token")

        }
    }
    else
    {
        res.status(401).send("Fail.NOt auth")
        // throw new Error("NOt auth re baba")
        // console.log("Not found");
    }

    // next()
}


const adminMiddleware =async(req, res, next)=> {

    if(req.user1 && req.user1.isAdmin)
    {
        console.log("ADMIN ACCESS");
        next()
    }
   
    else
    res.status(401).send("NOT ADMIN")
}



const sellerMiddleware =async(req, res, next)=> {

// console.log("Seller MIDDLEWARE",req.user1.isSeller,req.user1);

    if(req.user1 && req.user1.isSeller)
    {
        console.log("SELLER PART",req.user1.isSeller);
        console.log("SELLER ACCESS");
        next()
    }
   
    else
    res.status(401).send("NOT SELLER")
}


module.exports ={protect, adminMiddleware, sellerMiddleware };