const express=require('express')
const { signupSumission, loginSubmission, getUserData, authGranded, editProfile } = require('../controller/userController')
const { isUserAuthenticated, upload} = require('../middleware/userMiddleware')
const router=express.Router()
const userCol = require("../models/usersSchema");


router.post('/signupSubmit',upload.single('file'),signupSumission)

router.post('/loginSubmit',loginSubmission)

router.get('/userData',isUserAuthenticated,getUserData)

router.get('/auth',isUserAuthenticated,authGranded)

router.post('/editProfile/:id',isUserAuthenticated,upload.single('file'),editProfile)



module.exports=router