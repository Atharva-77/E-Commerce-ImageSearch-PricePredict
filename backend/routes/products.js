const exp= require('express')
const router= exp.Router()
const {protect,adminMiddleware} = require('../middleware/authMiddleware.js')

let ProductsDb=require('../schema_model/product_schema')


router.get('/',(req,res)=>
{
        // res.status(200)
        // throw new Error('Not authzz')

    ProductsDb.find()       //find method returns a promise.So result returened in json format
    .then(i=> res.json(i)) 
    .catch(err=> res.status(400).json('Error: '+err))
});

router.get('/:id',(req,res)=>
{
        // res.status(200)
        // throw new Error('Not authzz')

    ProductsDb.findById(req.params.id)       //find method returns a promise.So result returened in json format
    .then(i=> res.json(i)) 
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





//delete Product
router.delete('/deleteProduct/:id',protect,adminMiddleware,async(req,res)=>
{
    // const id=req.user1._id;
    // console.log("ID IN PROFILE",id);
    
    try{
        const prodDelete=await ProductsDb.findById(req.params.id)
        
            if(prodDelete)
            {
                await prodDelete.remove()

                res.send("Product deleted")
            }
            else
            res.status(401).send("NO Product found")
           
    }
    
    
    catch(error) {
        res.status(200).send("Invalid details")
    }

});





//Admin POST product
router.post('/admin/products/add',protect,adminMiddleware,async(req,res)=>
{
    const id=req.user1._id;
    try
    {
        const user=id
        const category=req.body.category
        const name=req.body.name
        const price=req.body.price
        const image=req.body.image
        const brand=req.body.brand
        const countInStock=req.body.countInStock
        const description=req.body.description

        // const noOfReview=req.body.noOfReview

        // const Avgrating=0
        // const reviews=[]


        const newadminProduct=new ProductsDb({
            user,
            category,
            name,
            image,
            brand,
            description,
            // Avgrating,
            // noOfReview,
            price,
            countInStock
            // reviews
        })


        newadminProduct.save()
        .then(()=>res.json('Admin Product saved Successfully'))
        .catch(err=>res.status(200).json("Product Error is "+err)) 
        
        console.log(newadminProduct)


      
    }

    catch(error) 
    {
        res.status(400).send("Invalid details")
    }

   
   
});





//ADMIN PUT
//EDIT PRODUCT
router.put('/admin/products/edit/:id',protect,adminMiddleware,async(req,res)=>
{
    const Userid=req.user1._id;
    //user1 is in protect i.e. authMIddleware file, when token is decoded
    // console.log("PUT/PROFILE",Userid);
    
    try{
        const Editproduct=await ProductsDb.findById(req.params.id)
        
        if(Editproduct){
            // console.log("Entered IF");

            Editproduct.name=req.body.name || Editproduct.name
            console.log("Editproduct.NAME",req.body.name || Editproduct.name);
            // console.log("Editproduct.NAME-",Editproduct.Name,Editproduct.Name);
            
            Editproduct.email=req.body.email || Editproduct.email
            Editproduct.category=req.body.category || Editproduct.category
            // Editproduct.name=req.body.name || Editproduct.n
            Editproduct.price=req.body.price || Editproduct.price
            Editproduct.image=req.body.image || Editproduct.image
            Editproduct.brand=req.body.brand || Editproduct.brand
            Editproduct.countInStock=req.body.countInStock || Editproduct.countInStock
            Editproduct.description=req.body.description || Editproduct.description

        //   console.log("New Profile",Editproduct);
            // console.log("BODY",req.body);

           const updateProduct= await Editproduct.save()                
            console.log("Updated product",updateProduct);
            res.send(
                {
                    user:updateProduct.user,
                    category:updateProduct.category,
                    name:updateProduct.name,
                    image:updateProduct.image,
                    brand:updateProduct.brand,
                    description:updateProduct.description,
                    // Avgrating:,
                    // noOfReview:,
                    price:updateProduct.price,
                    countInStock:updateProduct.countInStock                      
                }
            )
            // console.log("IF OVER");
        }
    
        else{
            res.status(401).send("NO Product found")
        }
    }
    
    catch(error) {
        res.status(200).send("Invalid details")
    }

});




//ADMIN Get individuaal product
router.get('/admin/products/:id',protect,adminMiddleware,(req,res)=>
{
        // res.status(200)
        // throw new Error('Not authzz')

    ProductsDb.findById(req.params.id)       //find method returns a promise.So result returened in json format
    .then(i=> res.json(i)) 
    .catch(err=> res.status(400).json('Error: '+err))
});

module.exports=router;