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
            console.log("Auth MIddleware ",req.user1);

            next()
        }

        catch(error){

        res.status(401).send("Fail. No token")

        }
    }
    else
    {
        res.status(401).send("Fail")
        // throw new Error("NOt auth re baba")
        // console.log("Not found");
    }

    // next()
}

module.exports =protect;