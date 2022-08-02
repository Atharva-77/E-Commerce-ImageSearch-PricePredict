const exp= require('express')
const router= exp.Router()

let RegisterDb=require('../schema_model/register')

router.post("/",async(req,res)=>
{

    try{
        const email=req.body.email;
        const password=req.body.password;
        console.log(`email ${email} , password is ${password}`);
        // res.send("Entered")
        const userDetails=await RegisterDb.findOne({email:email})
        
        console.log("Userdetails",userDetails);
        console.log("UserDeatils email , pass",userDetails.email,userDetails.password);
        // if you don't use async & await, o/p dosen't come 
        // res.send(userDetails)
        if(userDetails!=null)
        {
            if(email===userDetails.email && password==userDetails.password)
                res.send("Success")
            else
                 res.send("Fail")


        }
        else
            res.send("Fail")
    }
    catch(error) {
        res.status(200).send("Invalid details")
    }


})

module.exports=router;