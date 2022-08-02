const exp=require('express')
const dotenv=require('dotenv')
const connectDatabase= require('./config_folder/connectDB')
const cors=require('cors')
const path = require('path')

//Loading config file from config folder
dotenv.config({path: './config_folder/config.env'})


const app=exp()
const port=process.env.PORT || 5000


app.use(cors())
app.use(exp.json())


connectDatabase()


//routes
app.use('/registered',require('./routes/registerHere'))
app.use('/login_be',require('./routes/login'))

//brad
app.use('/login_brad',require('./routes/login_brad'))
app.use('/register_brad',require('./routes/register_brad'))


app.use('/products',require('./routes/products'))
app.use('/order',require('./routes/order_routes'))
app.use('/uploadImg',require('./routes/uploadRoutes'))

//converting uploads to static & importing it here  
app.use('/uploads',exp.static(path.join(__dirname,'/uploads')))
app.get('/config/paypal',(req,res)=>
    {
        // res.send("config paypal")
        res.send(process.env.PAYPAL_CLIENTID)
    }
)

app.listen(port, ()=>
{
    console.log(`Server is running on port ${port}`)
});