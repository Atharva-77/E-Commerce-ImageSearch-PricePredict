const exp= require('express')
const router= exp.Router()

let ProductsDb=require('../schema_model/product_schema')


router.get('/',(req,res)=>
{
        // res.status(200)
        // throw new Error('Not authzz')

    ProductsDb.find()       //find method returns a promise.So result returened in json format
    .then(users=> res.json(users)) 
    .catch(err=> res.status(400).json('Error: '+err))
});

router.get('/:id',(req,res)=>
{
        // res.status(200)
        // throw new Error('Not authzz')

    ProductsDb.findById(req.params.id)       //find method returns a promise.So result returened in json format
    .then(users=> res.json(users)) 
    .catch(err=> res.status(400).json('Error: '+err))
});


router.post('/add',async(req,res)=>
{
    try
    {
        const user=req.body.user
        const category=req.body.category
        const name=req.body.name
        const image=req.body.image
        const brand=req.body.brand
        const description=req.body.description
        const Avgrating=req.body.Avgrating
        const noOfReview=req.body.noOfReview
        const price=req.body.price
        const countInStock=req.body.countInStock
        const reviews=req.body.reviews

 
        // const userDetails=await ProductsDb.findOne({email:email})
        // console.log("Email is",userDetails);

        const newUser=new ProductsDb({
            user,
            category,
            name,
            image,
            brand,
            description,
            Avgrating,
            noOfReview,
            price,
            countInStock,
            reviews
        })


        newUser.save()
        .then(()=>res.json('Product saved Successfully'))
        .catch(err=>res.status(200).json("Product Error is "+err)) 
        
        console.log(newUser)


      
    }

    catch(error) 
    {
        res.status(400).send("Invalid details")
    }

   
   
});

module.exports=router;