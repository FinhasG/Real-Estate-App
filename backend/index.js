const express=require("express");
const app=express();
require('dotenv').config();
const connectDB=require('./database/db')
const userRoutes=require('./routes/user')
const authRoutes=require('./routes/auth')

app.use(express.json());



app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)



const server=async()=>{
    await connectDB(process.env.MONGO_URL)
    app.listen(4000,(req,res)=>{
        console.log("successfully connected")
    })
}

server()

