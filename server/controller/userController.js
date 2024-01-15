const { generateToken } = require("../middleware/userMiddleware");
const userCol = require("../models/usersSchema");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const secret = process.env.jwtSecret

module.exports = {
  signupSumission: async (req, res) => {
    try {
      req.body.profilePhoto = req.file.filename
      console.log(req.body);
      const hashPwd = await bcrypt.hash(req.body.password, 10)
      req.body.password = hashPwd
      await userCol.create(req.body);
      const userData = await userCol.findOne({ email: req.body.email })
      const token = generateToken({
        id: userData._id,
        name: userData.name
      })
      res.json({ token, auth: true, message: "Succesfully submitted signup form", userData, userId: userData._id });
    } catch (error) {
      console.log(error);
    }
  },

  editProfile: async (req, res) => {

    try {
      const {username,email,password}=req.body
      const filename=req?.file?.filename
      const hashPwd=await bcrypt.hash(password,10)
      const id = req.decoded.id
      await userCol.updateOne({ _id: id },
        {
          username,
          email,
          password:hashPwd,
          profilePhoto:filename
        }
        )
      res.json({ message: 'success', userData: req.body })
    } catch (error) {
      console.log(error);
    }
  },

  loginSubmission: async (req, res) => {
    try { 

      const userData = await userCol.findOne({ email: req.body.email });
      if (userData) {
        const hashPwd = await bcrypt.compare(req.body.password, userData.password)
        if (hashPwd) {
          const token = generateToken({
            id: userData._id,
            name: userData.username,
            iat: (Date.now() / 1000)
          });
          res.json({ token, auth: true, userData });
        } else {
          res.json({ auth: false, message: 'Inavlid email or password' })
        }
      } else {
        res.json({ auth: false, message: 'Invalid email or password' });
      }
    } catch (error) {
      console.log(error);
    }
  },


  getUserData: async (req, res) => {
    try {
      const token = req.headers.userauthorization;
      const decoded = jwt.verify(token, secret);
      const userData = await userCol.findOne({ _id: decoded.id })
      res.json({ userData })
    } catch (error) {
      console.log(error);
    }
  },

  authGranded: async (req, res) => {
    try {

      const decoded = req.decoded;
      res.json({ auth: true, userId: decoded.id })
    } catch (error) {
      console.log(error);
    }

  }

};


