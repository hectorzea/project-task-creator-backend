const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
exports.authUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({msg: 'Inexistent User'});
        }
        const passIsCorrect = await bcrypt.compare(password, user.password);
        if (!passIsCorrect) {
            return res.status(400).json({msg: 'Incorrect Password'})
        }
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payload, process.env.SECRET_WORD, {
            expiresIn: 3600000
        }, (error, token) => {
            if (error) throw error;
            res.json({token})
        });
    } catch (e) {
        console.log(e);
    }
};

exports.userAuthenticated = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        await res.json({user});
    } catch (e) {
        console.log(e);
        res.status(500).json({msg: 'Internal Server Error'})
    }
};