const jwt = require("jsonwebtoken");
const secret = process.env.jwtSecret

const isAdminAuthenticated = async (req, res, next) => {
    try {

        const token = req.headers.adminauthorization;
        if (token) {
            const decoded = jwt.verify(token, secret);
            if (decoded) {
                req.decoded = decoded
                next()
            }
        }


    } catch (error) {
        console.log(error);

        if (error.name === 'TokenExpiredError') {
            res.json({ auth: false, message: 'tokenExpired' })
        } else {
            res.json({ auth: false })
        }
    }


};

module.exports = {
    isAdminAuthenticated
}