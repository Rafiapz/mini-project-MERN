const { generateToken } = require("../middleware/userMiddleware");
const adminCol = require("../models/adminSchema");
const userCol = require("../models/usersSchema");
const bcrypt = require("bcrypt");

module.exports = {
    loginSubmit: async (req, res) => {
        const data = await adminCol.findOne({ email: req.body.email });

        if (data) {
            const auth = await bcrypt.compare(req.body.password, data.password);
            if (auth) {
                const token = generateToken({
                    id: data._id,
                    email: data.email,
                    iat: Date.now() / 1000,
                });
                res.json({ auth: true, message: "success", token });
            } else {
                res.json({ auth: false, message: "Invalid email or password" });
            }
        } else {
            res.json({ auth: false, message: "Invalid email or password" });
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const usersList = await userCol.find();
            res.json({ auth: true, usersList });
        } catch (error) {
            console.log(error);
        }
    },

    getSingleUserDetails: async (req, res) => {
        try {
            const query = req.query.user;
            const details = await userCol.findOne({ _id: query });

            res.json({ details });
        } catch (error) {
            console.log(error);
        }
    },

    editUser: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const id = req.params.id;
            const filename = req?.file?.filename;
            const hashPwd = await bcrypt.hash(password, 10);
            await userCol.updateOne(
                { _id: id },
                {
                    username,
                    email,
                    password: hashPwd,
                    profilePhoto: filename,
                }
            );

            res.json({ message: "success" });
        } catch (error) {
            console.log(error);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const id = req.params.id;

            const deleted = await userCol.deleteOne({ _id: id });
            if (deleted) {
                res.json({ deleted: true });
            } else {
                res.json({ deleted: false, message: "couldn't delete user" });
            }
        } catch (error) {
            console.log(error);
            res.json({ message: "something wentwrong" });
        }
    },

    createUser: async (req, res) => {
        try {

            const data=req.body
            const profilePhoto= req.file.filename
            data.profilePhoto=profilePhoto
            hashPwd=await bcrypt.hash(req.body.password,10)
            data.password=hashPwd;
            const success= await userCol.create(data)

            if(success){
                res.json({created:success})
            }else{
                res.json({created:false,message:"Couldn't create user"})
            }

        } catch (error) {
            console.log(error);
            res.json({message:'Somthing went wrong'})
        }
    },

    authGranded: async (req, res) => {
        try {
            const decoded = req.decoded;
            res.json({ auth: true, adminId: decoded.id });
        } catch (error) {
            console.log(error);
        }
    },
};
