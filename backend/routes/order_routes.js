const exp= require('express')
const router= exp.Router()
// const generateToken= require('../generateToken')
const {protect,adminMiddleware} = require('../middleware/authMiddleware.js')

let orderDb=require('../schema_model/order_schema')


router.post("/add",protect,async(req,res)=>
{

    console.log("order_route.js");
    const orderItems=req.body.orderItems
    const shippingAddress=req.body.shippingAddress
    const paymentMethod=req.body.paymentMethod
    const taxPrice=req.body.taxPrice
    const shippingPrice=req.body.shippingPrice
    const totalPrice=req.body.totalPrice

    console.log(orderItems,shippingAddress,paymentMethod,taxPrice,shippingPrice,totalPrice);

    // console.log("CLIENT ID",process.env.PAYPAL_CLIENTID);
    try{

        if(orderItems.length ==0 )
        {
            console.log("(order_routes.js) No items")
            res.send("No items present");
        }
        else
        {
            const newOrder=new orderDb({
                user:req.user1._id,
                orderItems,
                 shippingAddress,
                 paymentMethod ,
                 taxPrice ,
                 shippingPrice,
                 totalPrice
            })
    
    
            const savedOrder= await newOrder.save()    
            console.log("SAVED ORDER",savedOrder);
            res.send(
                {
                    // "new order done"
                   id:savedOrder._id
                })
            // .catch(err=>res.status(200).json("New order Error is "+err)) 
        }
        

    }
    catch(error) {
        res.status(200).send("Invalid details")
    }


})








//Put payment
router.put('/:id/pay',protect,async(req,res)=>
{
    const id=req.user1._id;
    //user1 is in protect i.e. authMIddleware file, when token is decoded
    console.log("PUT/PAY",id);
    
    try{
        const orderData=await orderDb.findById(req.params.id)
        //user:- its defined in order schema....that name used not Db's name
        
        if(orderData){

            orderData.isPaid=true
            orderData.paidAt=Date.now()

            //we get this from paypal...
            orderData.paymentResult={
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.payer.email_address
            }

            const updatedOrder= await orderData.save()


            res.send(updatedOrder)
          
        }
    
        else{
            res.status(401).send("NO order found in payment")
        }
    }
    
    catch(error) {
        res.status(200).send("Invalid details of payment")
    }
    


});


//get orders on profile page
router.get('/myorder',protect,async(req,res)=>
{
    const id=req.user1._id;
    //user1 is in protect i.e. authMIddleware file, when token is decoded
    console.log("Get/MYORDER",id);
    
    try{
        const orderData=await orderDb.find({user:id})
        //user:- its defined in order schema....that name used not Db's name
        
        if(orderData){
            // console.log("order_route");

            res.send(orderData)
          
        }
    
        else{
            res.status(401).send("NO order found")
        }
    }
    
    catch(error) {
        console.log("ERROR IS",error);
        res.status(200).send("Invalid details",)
    }
    

});



//get order.....order screen
router.get('/:id',protect,async(req,res)=>
{
    const id=req.user1._id;
    //user1 is in protect i.e. authMIddleware file, when token is decoded
    // console.log("GET/ORDER",id);
    
    try{
        const orderData=await orderDb.findById(req.params.id).populate('user','Name email')
        //user:- its defined in order schema....that name used not Db's name
        
        if(orderData){
            console.log("order_route",orderData);

            res.send(orderData)
          
        }
    
        else{
            res.status(401).send("NO order found")
        }
    }
    
    catch(error) {
        res.status(200).send("Invalid details")
    }
    

  
    // res.send("success profile")


});





//ADMIN Get all orders
router.get('/admin/allorder',protect,adminMiddleware,async(req,res)=>
{
    // const id=req.user1._id;
    console.log("ID IN ALLORDERS");
    
    try{
        const Allorders=await orderDb.find({}).populate('user','Name id')
        
            // console.log("IRDER_ROUTES ALLORDER",Allorders);
            // console.log("USER ON ALL ORDER",Allorders.user);
            res.send(
                {
                   Allorders
                                       
                }
            )
    }
    
    
    catch(error) {s
        res.status(200).send("Invalid details")
    }

});





//ADMIN DELIVERED
router.put('/admin/delivered/:id',protect,adminMiddleware,async(req,res)=>
{
    // const id=req.user1._id;
    console.log("ALL DELIVERED");
    
    try{
        const Allorders=await orderDb.findById(req.params.id)
        
        if(Allorders)
        {
            Allorders.isDelivered=true
            Allorders.deliveredAt=Date.now()
            const UpdatedOrder=await Allorders.save()
            console.log("IRDER_ROUTES delivered");
            
            res.send(UpdatedOrder)
            
        }
        else{
            res.status(401).send("NO order found.")
        }

            
    }
    
    
    catch(error) {
        res.status(200).send("Invalid details")
    }

});




module.exports=router;