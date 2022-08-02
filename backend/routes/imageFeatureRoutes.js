const exp= require('express')
const router= exp.Router()
const generateToken= require('../generateToken')
const {protect,adminMiddleware} = require('../middleware/authMiddleware.js')

let ImageSearchDb=require('../schema_model/imageSearch_schema')
let ProductsDb=require('../schema_model/product_schema')


router.post("/add",async(req,res)=>
{


    try{
        console.log("Entered in img features");
       
        const product_id=req.body.product_id;
        const image_feature=req.body.image_feature;
  
        console.log("Img",product_id,image_feature)
        
        const newFeature=new ImageSearchDb({
            productId : product_id,
           featureVector : image_feature
        })

        console.log(newFeature);
        newFeature.save()
        .then(()=>res.json('Product saved Successfully'))
        .catch(err=>res.status(200).json("Product Error is "+err))
    }
    catch(error) {
        res.status(200).send("Invalid details")
    }


})




router.post("/products",async(req,res)=>
{

    try{
        console.log("Entered in img PRODUCT featureS",req.body.product_ids);
        console.log("DATA IN IMG", req.body);
        var ids = req.body.product_ids

        
        let val=await ProductsDb.find({'_id': {$in: ids}});
        console.log("VALUE", val);
           
        res.status(200).send(val)

    }

    catch(error) {
        console.log("Error is ",error);
        res.status(200).send("Invalid details")
    }


})





router.get("/",async(req,res)=>
{


    try{
        console.log("Entered in GET img features");
        
        const AllImageSearch=await ImageSearchDb.find({})
        
        // console.log("ALLIMG ",AllImageSearch);
        res.send(AllImageSearch)
        
        // find({"sellerId":id.toString()})
    }
    catch(error) {
        res.status(200).send("Invalid details")
    }


})


// router.get("/single/:id",async(req,res)=>
// {


//     try{
//         console.log("Entered in GET img features");
       
//         const SingleImage=await ImageSearchDb.find({"productId":req.params.id.toString()})
        
//         console.log("SINGLE IMG ",SingleImage);
//         res.send(SingleImage)
      
        
//     }
//     catch(error) {
//         res.status(200).send("Invalid details")
//     }

// })
module.exports=router;