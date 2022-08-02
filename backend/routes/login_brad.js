const exp= require('express')
const router= exp.Router()
const generateToken= require('../generateToken')
const protect = require('../middleware/authMiddleware.js')

let RegisterDb=require('../schema_model/register')


router.post("/add",async(req,res)=>
{
    const {email,password}=req.body


    try{
        const email=req.body.email;
        const password=req.body.password;

        console.log(`email ${email} , password is ${password}`);

        const userDetails=await RegisterDb.findOne({email:email})
        
        console.log("Userdetails",userDetails);
        console.log("UserDeatils email , pass",userDetails.email,userDetails.password);
        // if you don't use async & await, o/p dosen't come 
        // res.send(userDetails)

        if(userDetails!=null)
        {
            if(email===userDetails.email && password==userDetails.password)
            {
                res.send(
                    {
                        ids:userDetails._id,
                        name:userDetails.Name,
                        email:email,
                        isAdmin:userDetails.isAdmin,
                        token:generateToken(userDetails._id)                      
                    }
                )
            }
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


//private route
router.get('/profile',protect,async(req,res)=>
{
    const id=req.user1._id;
    //user1 is in protect i.e. authMIddleware file, when token is decoded
    console.log("ID IN PROFILE",id);
    
    try{
        const userDetails=await RegisterDb.findById(id)
        
        if(userDetails){

            res.send(
                {
                    ids:userDetails._id,
                    name:userDetails.Name,
                    email:userDetails.email,
                    isAdmin:userDetails.isAdmin,
                                       
                }
            )
        }
    
        else{
            res.status(401).send("NO user found")
        }
    }
    
    catch(error) {
        res.status(200).send("Invalid details...error")
    }
    

  
    // res.send("success profile")


});


module.exports=router;