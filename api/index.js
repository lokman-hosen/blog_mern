import express from "express"
import mongoose from 'mongoose';
import authRoute from './routes/auth.js'
import categoryRoute from './routes/category.js'
import userRoute from './routes/users.js'
import postRoute from './routes/post.js'
//path for file
import path from 'path';
const __dirname = path.resolve();

const app = express()


import dotenv from "dotenv"
import cors from "cors";
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

//app.use(express.static('api'))
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));




app.use(express.json())
app.use(cors())
app.use("/api/auth", authRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen(8800, () =>{
    connect()
    console.log('connected again')
})