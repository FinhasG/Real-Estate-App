const express=require("express");
const app=express();
require('dotenv').config();
const connectDB=require('./database/db')
const userRoutes=require('./routes/user')
const authRoutes=require('./routes/auth')

app.use(express.json());



app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || "Internal server error";
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });

})



const server=async()=>{
    await connectDB(process.env.MONGO_URL)
    app.listen(4000,(req,res)=>{
        console.log("successfully connected")
    })
}

server()

