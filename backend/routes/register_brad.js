const exp = require('express')
const router= exp.Router()
const generateToken= require('../generateToken')

let RegisterDb=require('../schema_model/register')


router.get('/hi',(req,res)=>
{
    RegisterDb.find()       //find method returns a promise.So result returened in json format
    .then(users=> res.json(users)) 
    .catch(err=> res.status(400).json('Error: '+err))
});


router.post('/add',async(req,res)=>
{
    try
    {
        console.log("LOGG",req.body);
        const Name=req.body.name
        const email=req.body.email
        const password=req.body.password
        // const confirmPassword=req.body.confirmPassword
 
        const userDetails=await RegisterDb.findOne({email:email})
        console.log("Email is",userDetails);
        console.log();

        // Unique email
        if(userDetails==null)
         {
            console.log("New email");
            // if(password === confirmPassword)
            // {
                 const newUser=new RegisterDb({
                     Name,
                     email,
                     password,
                    //  confirmPassword
                 })
         
                 console.log(newUser.Name,newUser.email,newUser.password)
                //  console.log(newUser)

                newUser.save()
                 .then(()=>res.status(201).json(
                     {
                        id:newUser._id,
                        name:newUser.Name,
                        email:email,
                        isAdmin:newUser.isAdmin,
                        token:generateToken(newUser._id)
                     }))
                 .catch(err=>res.status(200).json("Register ka Error is "+err)) 
                //  console.log(newUser)
                 console.log(newUser)
            // }
            // else
            // {
            //     console.log("(register_brad) Userdetails",newUser);
            //     res.status(200).json("Password Not Matching registr")
            // }
     

         }
         else
         {
            res.status(200).json("Email already in use!")
         }
 
      
    }
    catch(error) 
    {
        res.status(400).send("Invalid details")
    }

   
   
});

module.exports=router;