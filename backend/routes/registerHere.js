    const exp= require('express')
    const router= exp.Router()

    let RegisterDb=require('../schema_model/register')


    // router.get('/hi',(req,res)=>
    // {
    //     // res.render(`http://localhost:3000/`)
    // });

    router.post('/',(req,res)=>
    {
       const Name=req.body.Name
       const email=req.body.email
       const password=req.body.password
       const confirmPassword=req.body.confirmPassword

       if(password === confirmPassword)
       {
            const newUser=new RegisterDb({
                Name,
                email,
                password,
                confirmPassword
            })
    
    
            newUser.save()
            .then(()=>res.json('Usr added'))
            .catch(err=>res.status(400).json("Error is "+err)) 
            
            console.log(newUser)
       }
       else
       {
           res.status(404).json("Password Not Matching")
       }

       
    });

    module.exports=router;