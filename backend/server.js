const exp=require('express')
const dotenv=require('dotenv')
const connectDatabase= require('./config_folder/connectDB')
const cors=require('cors')

//Loading config file from config folder
dotenv.config({path: './config_folder/config.env'})


const app=exp()
const port=process.env.PORT || 6000


app.use(cors())
app.use(exp.json())


connectDatabase()


//routes
app.use('/registered',require('./routes/registerHere'))
app.use('/login_be',require('./routes/login'))



app.listen(port, ()=>
{
    console.log(`Server is running on port ${port}`)
});