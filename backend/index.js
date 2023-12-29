const exp=require('express')
const dotenv=require('dotenv')
const connectDatabase= require('./config_folder/connectDB')
const cors=require('cors')
const path = require('path')
const morgan = require('morgan')


//Loading config file from config folder
dotenv.config({path: './config_folder/config.env'})


const app=exp()
const port=process.env.PORT || 5000


app.use(cors())
app.use(exp.json())


connectDatabase()

app.use(morgan("dev"))
//routes
app.use(exp.json({limit: '50mb'}));

app.use(exp.json({limit: '50mb', extended: true}))
app.use(exp.urlencoded({limit: '50mb', extended: true}))

// app.use('/registered',require('./routes/registerHere'))
// app.use('/login_be',require('./routes/login'))

//brad
app.use('/login_brad',require('./routes/login_brad'))
app.use('/register_brad',require('./routes/register_brad'))


app.use('/products',require('./routes/products'))
app.use('/order',require('./routes/order_routes'))
app.use('/uploadImg',require('./routes/uploadRoutes'))
app.use('/imgFeature',require('./routes/imageFeatureRoutes'))

//converting uploads to static & importing it here  
// app.use('/uploads',exp.static(path.join(__dirname,'/uploads')))


app.use('/upload',exp.static(path.join(__dirname, './client/UploadImg/')))

console.log("DIR",path.join(__dirname, './client/UploadImg/'));

app.get('/config/paypal',(req,res)=>
    {
        // res.send("config paypal")
        res.send(process.env.PAYPAL_CLIENTID)
    }
)

if(process.env.NODE_ENV === 'production'){
    app.use(exp.static('client/build'))

}

app.listen(port, ()=>
{
    console.log(`Server is running on port ${port}`)
});