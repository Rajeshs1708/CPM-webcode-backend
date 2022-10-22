const express = require('express')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const router = express.Router();

const userModel = require('../Models/auth.model');

//signup
router.post('/signup', async (req, res) => {
    try {
        const payload = req.body;
   
            const salt = await bcrypt.genSalt(10);
            payload.hashedPassword = await bcrypt.hash(payload.password, salt);
    
            delete payload.password;
    
            let user = new userModel(payload); //creating mongoose object 

            user.save((err, data) => {
                if (err) {
                    return res.status(400).send({
                        message: "Error while registering the user."
                    })
                }
    
                return res.status(201).send({
                    message: "User has been registered successfully.",
                    data: data.hashedPassword,
                    role: data.role
                })
            })
        
    } catch (err) {
        return res.status(500).send({
            message: 'Internal Server Error'
        })
    }
});


//signin
router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await userModel.findOne({ email: email })

        if (existingUser) {
            const isValidUser = await bcrypt.compare(password, existingUser.hashedPassword); //true or false

            if (isValidUser) {
                const token = jwt.sign({ _id: existingUser._id }, process.env.SECRET_KEY);

                //persist the token as 't' in cookie with expiry date
                res.cookie('entryToken', token, {
                    expires: new Date(Date.now() + 9999999),
                    httpOnly: false
                });

                //return response with user and token to frontend client
                const { _id, name, email, role } = existingUser;
                return res.status(200).send({ token: token, user: { _id, email, name, role }, message: "Login successfully from backend" });

            }

            return res.status(400).send({
                message: 'Email/Password are not matching.'
            })
        }
        return res.status(400).send({
            message: "User doesn't exist."
        });
    } catch (err) {
        return res.status(500).send({
            message: 'Internal Server Error'
        })
    }
});


// //signout
router.get('/signout', async (req, res) => {
    await res.clearCookie('entryToken');

    return res.status(200).send({
        message: "Successfully Signed out! "
    });
})


module.exports = router;

