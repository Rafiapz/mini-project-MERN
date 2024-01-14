const jwt = require("jsonwebtoken");
const multer = require("multer");
const userCol = require('../models/usersSchema')
const secret = process.env.jwtSecret

const generateToken = (payload) => {
  return jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: 60* 30 });
};

const isUserAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, secret);
    if (decoded) {
      req.decoded=decoded
      next()
    }

  } catch (error) {

    if (error.name === 'TokenExpiredError') {
      res.json({ auth: false, message: 'tokenExpired' })
    } else {
      res.json({ auth: false })
    }
  }

};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

module.exports = {
  generateToken,
  isUserAuthenticated,
  upload,
};
