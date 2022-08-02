const exp = require('express')
const router= exp.Router()

const multer = require('multer')

let ProductsDb=require('../schema_model/product_schema')


router.get('/hi',(req,res)=>
{
    res.send("get req")
});

const fs=require("fs");
const { promisify } = require('util');
const pipeline=promisify(require("stream").pipeline)

const path = require('path');
const { request } = require('http');
// const filePath = path.join(__dirname, '/pictures');

const upload =multer()


router.post('/add', upload.single("file"),async(req,res)=>
{
    
    //    console.log("POST REQ",req.file.mimetype.split("/"));
    //    console.log("Name",req.file.originalname);
    //    console.log("streams",exp.static(path.join(__dirname, '/public')));
  try{
    console.log("Direc posn",path.join(__dirname, '../client/UploadImg/'));
    let x=path.join(__dirname,  '../client/UploadImg/');
    var c=new Date()
    let cc = ""
    if(!(!req.file)){
      cc = c.toString().substring(0,24)+req.file.clientReportedFileExtension
      cc = cc.replace(":","-")
      cc = cc.replace(":","-")
    }
    let fx=`${x}${cc}`
    // let fx=`${x}${req.file.originalName}`
    console.log("PATH ",fx);
    // console.log("FILE",req.file);
    // console.log("STREAM ",req.file.stream);
    // console.log("Name ",req.file.originalName);

  //  console.log("REQ BODY IMAGES",req.body.id_Img);
    if(!(!req.file)){
      await pipeline(req.file.stream,fs.createWriteStream(fx))
    }
    console.log("response to be send",fx);

    const Viewproduct=await ProductsDb.findById(req.body.id_Img)
 

      Viewproduct.name= Viewproduct.name
      Viewproduct.category= Viewproduct.category
      Viewproduct.price= Viewproduct.price
      Viewproduct.imageURL= Viewproduct.imageURL
      Viewproduct.brand= Viewproduct.brand
      Viewproduct.countInStock= Viewproduct.countInStock
      Viewproduct.description= Viewproduct.description

      if(!(!req.file)){
        Viewproduct.imageFile.data=fs.readFileSync(fx)
        Viewproduct.imageFile.contentType='image/png'
      }
  
  

  console.log("VIEW FEATURE",Viewproduct);

  // const objImg = {img:null}

  // objImg.img = new Buffer.from(fs.readFileSync(fx)).toString("base64")

  // console.log("OBJ BUFFER",objImg[0]);

  Viewproduct.save()
  .then(()=>
  {
    res.json(
      {
        image_path:fx,
        image_link:Viewproduct.imageURL
      })
  })
  .catch(err=>res.status(200).json("imgg Error is "+err))

  // res.send(
  //   {
  //       fx,
  //       Viewproduct:Viewproduct                      
  //   }
  // )
   
  }
  catch(error)
  {
      console.log("ITS ERROR",error);
      res.send(error)
  }
   
});





router.post('/add3', upload.single("file"),async(req,res)=>
{
    
    //    console.log("POST REQ",req.file.mimetype.split("/"));
    //    console.log("Name",req.file.originalname);
    //    console.log("streams",exp.static(path.join(__dirname, '/public')));
  try{
    console.log("Direc posn",path.join(__dirname, '../../public/Uploadedimages/'));
    let x=path.join(__dirname,  '../../UploadImg/');

    let fx=`${x}${req.file.originalName}`
    console.log("PATH ",fx);
    // console.log("FILE",req.file);
    // console.log("STREAM ",req.file.stream);
    // console.log("Name ",req.file.originalName);

   console.log("REQ BODY ",req.body.id_Img);

   await pipeline(req.file.stream,fs.createWriteStream(fx))
   console.log("response to be send",fx);
   res.send(fx)
   
  }
  catch(error)
  {
      console.log("ITS ERROR");
      res.send(error)
  }
   
});
module.exports=router;
































































// const exp = require('express')
// const router= exp.Router()

// const multer = require('multer')

// let ProductsDb=require('../schema_model/product_schema')


// router.get('/hi',(req,res)=>
// {
//     res.send("get req")
// });

// const fs=require("fs");
// const { promisify } = require('util');
// const pipeline=promisify(require("stream").pipeline)

// const path = require('path');
// // const filePath = path.join(__dirname, '/pictures');

// const upload =multer()


// router.post('/add', upload.single("file"),async(req,res)=>
// {
//     console.log("Entered in")
//     //    console.log("POST REQ",req.file.mimetype.split("/"));
//     //    console.log("Name",req.file.originalname);
//     //    console.log("streams",exp.static(path.join(__dirname, '/public')));
//   try{
//     console.log("Direc posn",path.join(__dirname, '../../public/Uploadedimages/'));
//     let x=path.join(__dirname,  '../../UploadImg/');
//     var c=new Date()
//     let cc=c.toString().substring(0,24)+req.file.clientReportedFileExtension
//     let fx=`${x}${cc}`
//     // let fx=`${x}${req.file.originalName}`
//     console.log("PATH ",fx);
//     // console.log("FILE",req.file);
//     // console.log("STREAM ",req.file.stream);
//     // console.log("Name ",req.file.originalName);

//   //  console.log("REQ BODY IMAGES",req.body.id_Img);

//    await pipeline(req.file.stream,fs.createWriteStream(fx))
//    console.log("response to be send",fx);

//    const Viewproduct=await ProductsDb.findById(req.body.id_Img)
 

//       Viewproduct.name= Viewproduct.name
//       Viewproduct.category= Viewproduct.category
//       Viewproduct.price= Viewproduct.price
//       Viewproduct.imageURL= Viewproduct.imageURL
//       Viewproduct.brand= Viewproduct.brand
//       Viewproduct.countInStock= Viewproduct.countInStock
//       Viewproduct.description= Viewproduct.description

//       Viewproduct.imageFile.data=fs.readFileSync(fx)
//       Viewproduct.imageFile.contentType='image/png'
  
  

//   console.log("VIEW FEATURE",Viewproduct);

//   // const objImg = {img:null}

//   // objImg.img = new Buffer.from(fs.readFileSync(fx)).toString("base64")

//   // console.log("OBJ BUFFER",objImg[0]);
//   console.log("Exited")
//   Viewproduct.save()
//   .then(()=>
//   {
//     res.json(
//       {
//         fx,
//         yo:Viewproduct.imageURL
//       })
//   })
//   .catch(err=>res.status(200).json("imgg Error is "+err))

//   // Viewproduct.save()
//   // .then(()=>res.json({fx, Viewproduct: Viewproduct}))
//   // .catch(err=>res.status(200).json("imgg Error is "+err))

//   // res.send(
//   //   {
//   //       fx,
//   //       Viewproduct:Viewproduct
//   //   }
//   // )
   
//   }
//   catch(error)
//   {
//       console.log("ITS ERROR",error);
//       res.send(error)
//   }
   
// });




// router.post('/add2', upload.single("file"),async(req,res)=>
// {
    
//     //    console.log("POST REQ",req.file.mimetype.split("/"));
//     //    console.log("Name",req.file.originalname);
//     //    console.log("streams",exp.static(path.join(__dirname, '/public')));
//   try{
//     console.log("Direc posn",path.join(__dirname, '../../public/Uploadedimages/'));
//     let x=path.join(__dirname,  '../../UploadImg/');

//     let fx=`${x}${req.file.originalName}`
//     console.log("PATH ",fx);
//     // console.log("FILE",req.file);
//     // console.log("STREAM ",req.file.stream);
//     // console.log("Name ",req.file.originalName);

//    console.log("REQ BODY ",req.body.id_Img);

//    await pipeline(req.file.stream,fs.createWriteStream(fx))
//    console.log("response to be send",fx);
//    res.send(fx)
   
//   }
//   catch(error)
//   {
//       console.log("ITS ERROR");
//       res.send(error)
//   }
   
// });






// // const fs=require("fs");
// // const { promisify } = require('util');
// // const pipeline=promisify(require("stream").pipeline)

// // const path = require('path');
// // const filePath = path.join(__dirname, '/pictures');

// // const upload =multer()
// router.post('/add3', upload.single("file"),async(req,res)=>
// {
    
//     //    console.log("POST REQ",req.file.mimetype.split("/"));
//     //    console.log("Name",req.file.originalname);
//     //    console.log("streams",exp.static(path.join(__dirname, '/public')));
//   try{
//     console.log("Direc posn",path.join(__dirname, '../../public/Uploadedimages/'));
//     let x=path.join(__dirname,  '../../UploadImg/');

//     let fx=`${x}${req.file.originalName}`
//     console.log("PATH ",fx);
//     // console.log("FILE",req.file);
//     // console.log("STREAM ",req.file.stream);
//     // console.log("Name ",req.file.originalName);

//    console.log("REQ BODY ",req.body.id_Img);

//    await pipeline(req.file.stream,fs.createWriteStream(fx))
//    console.log("response to be send",fx);
//    res.send(fx)
   
//   }
//   catch(error)
//   {
//       console.log("ITS ERROR");
//       res.send(error)
//   }
   
// });
// module.exports=router;




























// // const exp = require('express')
// // const router= exp.Router()
// // const multer = require('multer')
// // const path = require('path')

// // const storage= multer.diskStorage({
// //     destination(req,file,cb){
// //         cb(null,'uploads/') //(error,folder name)
// //     },
// //     filename(req,file,cb){ // 2 images with same name
// //         cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`) 
// //     }

// // })


// // function checkFileType(file,cb){
// //     const filetypes=/jpg|jpeg|png/
// //     const extname=filetypes.test(path.extname(file.originalname).toLowerCase())
// //     const mimetype=filetypes.test(file.mimetype)
// // console.log("UPLOADROUTES ",1);

// //     if(extname && mimetype)
// //     {
// //         console.log("UploadROUTES.JS",extname,mimetype);
// //         return cb(null,true)
// //     }
// //     else
// //     {
// //         cb("Images only!")
// //     }
// // }

// // const upload=multer({

// //     storage,
// //     fileFilter: function(req,file,cb){
// //         checkFileType(file,cb)
// //     }
// // })

// //                             //rem this "image" name for FE
// // router.post("/",upload.single('image'),(req,res)=> {
// //     console.log("UPLOADROUTES ",21,req.file);

// // // res.send("NICE")
// //     res.send(`/${req.file.path}`)
// // })


// // module.exports=router;