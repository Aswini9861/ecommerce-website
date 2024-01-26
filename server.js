import express from "express";
import color from 'colors'
import dotenv from 'dotenv'
import ConnectDB from "./config/db.js";
import morgan from "morgan";
import authrouter from "./routes/authroutes.js";
import categoryrouter from "./routes/categoryroutes.js"
import bodyParser from 'express'
import cors from 'cors'
import productrouter from './routes/productroutes.js'

//config


const app =express()
app.use(cors())

ConnectDB()
app.use(morgan('dev'))
app.use(bodyParser.json());
dotenv.config()

app.use('/api/v1/auth',authrouter)
app.use('/api/v1/category',categoryrouter)
app.use('/api/v1/product',productrouter)

app.get('/',(req,res)=>{
    res.send('hello world')
})


app.listen(process.env.PORT||8080,()=>{
    console.log(`server running on ${process.env.MODE} made on port ${process.env.PORT||8000}`.bgCyan.white)
})