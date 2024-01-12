const { generateToken } = require("../middleware/userMiddleware");
const userCol = require("../models/usersSchema");
const bcrypt = require('bcrypt')

module.exports = {
  signupSumission: async (req, res) => {
    try {
      req.body.profilePhoto = req.file.filename
      const hashPwd = await bcrypt.hash(req.body.password, 10,)
      req.body.password = hashPwd
      await userCol.create(req.body);
      const token = generateToken({
        id: req.body.email,
        name: req.body.name
      })
      res.json({ token, auth: true, message: "Succesfully submitted signup form", data: req.body });
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
            id: userData.email,
            name: userData.username,
            iat: (Date.now() / 1000)
          });
          res.json({ token, auth: true,userData });
        }else{
          res.json({auth:false,message:'Inavlid email or password'})
        }
      } else {
        res.json({ auth: false,message:'Invalid email or password' });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
