const express=require('express')
const { loginSubmit, getAllUsers, searchUser, authGranded, getSingleUserDetails, editUser, deleteUser, createUser } = require('../controller/adminController')
const { isAdminAuthenticated } = require('../middleware/adminMiddleware')
const { upload } = require('../middleware/userMiddleware')
const router=express.Router()


router.post('/adminLogin',loginSubmit)

router.get('/allusers',isAdminAuthenticated,getAllUsers)

router.get('/auth',isAdminAuthenticated,authGranded)

router.get('/user-details',isAdminAuthenticated,getSingleUserDetails)

router.post('/edituser/:id',isAdminAuthenticated,upload.single('file'),editUser)

router.delete('/delete-user/:id',isAdminAuthenticated,deleteUser)

router.post('/createUser',isAdminAuthenticated,upload.single('file'),createUser)



module.exports=router