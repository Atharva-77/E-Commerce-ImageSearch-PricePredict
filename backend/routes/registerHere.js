    const exp= require('express')
    const router= exp.Router()

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
            const Name=req.body.Name
            const email=req.body.email
            const password=req.body.password
            const confirmPassword=req.body.confirmPassword
     
            const userDetails=await RegisterDb.findOne({email:email})
            console.log("Email is",userDetails);

            // Unique email
            if(userDetails==null)
             {
                console.log("New email");
                if(password === confirmPassword)
                {
                     const newUser=new RegisterDb({
                         Name,
                         email,
                         password,
                        //  confirmPassword
                     })
             
             
                     newUser.save()
                     .then(()=>res.json('Success'))
                     .catch(err=>res.status(200).json("Error is "+err)) 
                     
                     console.log(newUser)
                }
                else
                {
                    res.status(200).json("Password Not Matching")
                }
         

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