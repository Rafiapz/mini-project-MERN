const mongoose=require('mongoose')

const usersSchema=new mongoose.Schema({

    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profilePhoto:{
        type:String,
        require:true
    }

})

const userModel=mongoose.model('users',usersSchema)

module.exports=userModel