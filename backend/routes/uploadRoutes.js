const exp = require('express')
const router= exp.Router()
const multer = require('multer')
const path = require('path')

const storage= multer.diskStorage({
    destination(req,file,cb){
        cb(null,'uploads/') //(error,folder name)
    },
    filename(req,file,cb){ // 2 images with same name
        cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`) 
    }

})


function checkFileType(file,cb){
    const filetypes=/jpg|jpeg|png/
    const extname=filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype=filetypes.test(file.mimetype)
console.log("UPLOADROUTES ",1);

    if(extname && mimetype)
    {
        console.log("UploadROUTES.JS",extname,mimetype);
        return cb(null,true)
    }
    else
    {
        cb("Images only!")
    }
}

const upload=multer({

    storage,
    fileFilter: function(req,file,cb){
        checkFileType(file,cb)
    }
})

                            //rem this "image" name for FE
router.post("/",upload.single('image'),(req,res)=> {
    console.log("UPLOADROUTES ",21,req.file);

// res.send("NICE")
    res.send(`/${req.file.path}`)
})


module.exports=router;