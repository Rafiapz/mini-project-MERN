require('./config/mongoose')
require('dotenv').config()
const express=require('express')
const cors=require('cors')
const bodyParser=require('express').json
const jwt=require('jsonwebtoken')
const userRoute=require('./routes/userRoutes')
const adminRoute=require('./routes/adminRoutes')
const app=express()
const fs=require('fs')
const path=require('path')
const port=3100


app.use(cors({
    origin:'http://localhost:5173',
    methods:'GET,POST,PUT,PATCH,HEAD,DELETE',
    credentials:true
}))

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser())
app.use(express.static(path.join(__dirname,'public')))

app.use('/',userRoute)

app.use('/admin',adminRoute)

app.listen(port,()=>console.log(`server running on the ${port}`))