const exp = require('express')
const router= exp.Router()

const multer = require('multer')

// const generateToken= require('../generateToken')

// let RegisterDb=require('../schema_model/register')


router.get('/hi',(req,res)=>
{
    res.send("get req")
    // console.log("GET REQ");
});

const fs=require("fs");
const { promisify } = require('util');
const pipeline=promisify(require("stream").pipeline)

const path = require('path');
// const filePath = path.join(__dirname, '/pictures');

const upload =multer()
router.post('/add', upload.single("file"),async(req,res)=>
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
// const path = require('path')

// const storage= multer.diskStorage({
//     destination(req,file,cb){
//         cb(null,'uploads/') //(error,folder name)
//     },
//     filename(req,file,cb){ // 2 images with same name
//         cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`) 
//     }

// })


// function checkFileType(file,cb){
//     const filetypes=/jpg|jpeg|png/
//     const extname=filetypes.test(path.extname(file.originalname).toLowerCase())
//     const mimetype=filetypes.test(file.mimetype)
// console.log("UPLOADROUTES ",1);

//     if(extname && mimetype)
//     {
//         console.log("UploadROUTES.JS",extname,mimetype);
//         return cb(null,true)
//     }
//     else
//     {
//         cb("Images only!")
//     }
// }

// const upload=multer({

//     storage,
//     fileFilter: function(req,file,cb){
//         checkFileType(file,cb)
//     }
// })

//                             //rem this "image" name for FE
// router.post("/",upload.single('image'),(req,res)=> {
//     console.log("UPLOADROUTES ",21,req.file);

// // res.send("NICE")
//     res.send(`/${req.file.path}`)
// })


// module.exports=router;