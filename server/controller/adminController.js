const adminCol = require('../models/adminSchema')
const bcrypt = require('bcrypt')

module.exports = {

    loginSubmit: async (req, res) => {

        const data = await adminCol.findOne({ email: req.body.email })

        if (data) {

            const auth = await bcrypt.compare(req.body.password, data.password)

            if (auth) {
                res.json({ auth: true , message:'success'})
            } else {
                res.json({ auth: false, message: 'Invalid email or password' })
            }

        } else {
            res.json({ auth: false, message: 'Invalid email or password' })
        }


        
    }
}