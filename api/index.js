import express from "express"
import mongoose from 'mongoose';
//import authRoute from './routes/auth.js'
import categoryRoute from './routes/category.js'

const app = express()

import dotenv from "dotenv"
dotenv.config()
const connect = async () =>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('connected to database')
    } catch (error) {
        throw error;
    }
}

mongoose.connection.on("disconnected", ()=>{
     console.log('MongoBd disconnected')
})

app.get("/", (req, res) =>{
    res.send("Hello mongoo app")
})

//middleware
app.use(express.json())
//app.use("/api/auth", authRoute);
app.use("/api/category/create", categoryRoute);

app.listen(8800, () =>{
    connect()
    console.log('connected again')
})