require('./config/mongoose')
require('dotenv').config()
const express=require('express')
const cors=require('cors')
const bodyParser=require('express').json
const jwt=require('jsonwebtoken')
const userRoute=require('./routes/userRoutes')
const app=express()
const fs=require('fs')
const path=require('path')
const port=3100


app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser())
app.use(express.static(path.join(__dirname,'public')))

app.use('/',userRoute)

app.listen(port,()=>console.log(`server running on the ${port}`))