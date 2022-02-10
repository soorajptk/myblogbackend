require('dotenv').config()
require('express-async-errors')
const express=require('express')
const app=express()
const connectDB =require('./connectDB/connectDB')

const notFound =require('./middileware/notFound')
const errorHandler =require('./middileware/error-handler')
//authrouter
const authRouter=require('./routes/auth')
//blogauth
const blogRouter=require('./routes/blog')
const fileUpload=require('express-fileupload')
const cors=require('cors')
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('./public'))
app.use('/api/auth/',authRouter)
app.use('/api/blog/',blogRouter)

app.use(notFound)
app.use(errorHandler)
let PORT=process.env.PORT || 5000;
const Start=async()=>{
    try {
    await connectDB(process.env.MONGO_URL)
    app.listen(PORT,()=>console.log("port running on 5000"))
        
    } catch (error) {
        console.log(error)
    }
}

Start()