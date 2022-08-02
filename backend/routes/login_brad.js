const exp= require('express')
const router= exp.Router()
const generateToken= require('../generateToken')
const {protect,adminMiddleware} = require('../middleware/authMiddleware.js')

let RegisterDb=require('../schema_model/register')


router.post("/add",async(req,res)=>
{
    const {email,password}=req.body


    try{
        const email=req.body.email;
        const password=req.body.password;

       
        const userDetails=await RegisterDb.findOne({email:email})
        
        console.log("Userdetails",userDetails);
       
        console.log(`23 email ${email} , password is ${password}`);

        console.log("25 login-brad)UserDetails email , pass",userDetails.email,userDetails.password);
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
                        isSeller:userDetails.isSeller,
                        token:generateToken(userDetails._id)                      
                    }
                )
            }
            else    
                 res.send("Fail. Email or password not matching")


        }
        else
            res.send("Fail.No user")
    }
    catch(error) {
        res.status(200).send("Invalid details")
    }


})






//private route
//get Profile
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
        res.status(200).send("Invalid details")
    }
});






//EDIT PROFILE
router.put('/profile',protect,async(req,res)=>
{
    const id=req.user1._id;
    //user1 is in protect i.e. authMIddleware file, when token is decoded
    console.log("PUT/PROFILE",id);
    
    try{
        const User=await RegisterDb.findById(id)
        
        if(User){

            User.Name=req.body.Name || User.Name
            console.log("USER.NAME",req.body.name || User.Name);
            console.log("USER.NAME-",User.Name,User.Name);
            
            User.email=req.body.email || User.email

            if(req.body.password)
            {
                User.password=req.body.password
            }
        console.log("New Profile",User);
        console.log("BODY",req.body);

           const updateUser= await User.save()                
            console.log("Updated user",updateUser);
            res.send(
                {
                    ids:updateUser._id,
                    name:updateUser.Name,
                    email:updateUser.email,
                    isAdmin:updateUser.isAdmin,
                    token:generateToken(updateUser._id)                      
                }
            )
        }
    
        else{
            res.status(401).send("NO user found")
        }
    }
    
    catch(error) {
        res.status(200).send("Invalid details")
    }

});







//GET ALL USERS
router.get('/allUsers',protect,adminMiddleware,async(req,res)=>
{
    const id=req.user1._id;
    console.log("ID IN PROFILE",id);
    
    try{
        const Allusers=await RegisterDb.find({})
        
            
            res.send(
                {
                   Allusers
                                       
                }
            )
    }
    
    
    catch(error) {
        res.status(200).send("Invalid details")
    }

});








//DELETE USER
router.delete('/deleteUser/:id',protect,adminMiddleware,async(req,res)=>
{
    const id=req.user1._id;
    // console.log("ID IN PROFILE",id);
    
    try{
        const user=await RegisterDb.findById(req.params.id)
        
            if(user)
            {
                await user.remove()

                res.send("User deleted")
            }
            else
            res.status(401).send("NO user found")
           
    }
    
    
    catch(error) {
        res.status(200).send("Invalid details")
    }

});







//Get profile by admin
router.get('/admin/profile/:id',protect,adminMiddleware,async(req,res)=>
{
    // const id=req.user1._id;
    //user1 is in protect i.e. authMIddleware file, when token is decoded
    // console.log("ID IN PROFILE",id);
    
    try{
        const userDetails=await RegisterDb.findById(req.params.id)
        
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
        res.status(200).send("Invalid details")
    }
});






//EDIT PROFILE
router.put('/admin/profile/:id',async(req,res)=>
{
    // const id=req.user1._id;
    //user1 is in protect i.e. authMIddleware file, when token is decoded
    // console.log("PUT/PROFILE",id);
    
    try{
        const User=await RegisterDb.findById(req.params.id)
        
        if(User){

            User.Name=req.body.Name || User.Name
            // console.log("USER.NAME",req.body.name || User.Name);
            // console.log("USER.NAME-",User.Name,User.Name);
            
            User.email=req.body.email || User.email

            // if(req.body.password)
            // {
            //     User.password=req.body.password
            // }
        // console.log("New Profile",User);
        // console.log("BODY",req.body);

           const updateUser= await User.save()                
            console.log("Updated user",updateUser);
            res.send(
                {
                    ids:updateUser._id,
                    name:updateUser.Name,
                    email:updateUser.email,
                    isAdmin:updateUser.isAdmin,
                    // token:generateToken(updateUser._id)                      
                }
            )
        }
    
        else{
            res.status(401).send("NO user found")
        }
    }
    
    catch(error) {
        res.status(200).send("Invalid details")
    }

});





module.exports=router;