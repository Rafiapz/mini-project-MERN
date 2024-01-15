const express=require('express')
const { loginSubmit } = require('../controller/adminController')
const router=express.Router()


router.post('/adminLogin',loginSubmit)


module.exports=router