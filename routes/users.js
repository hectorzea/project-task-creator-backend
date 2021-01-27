//routes for the users.
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const {check} = require('express-validator');

// api/users
router.post('/', [
        check('username', 'The name is obligatory').not().isEmpty(),
        check('email', 'Add a valid email').isEmail(),
        check('password', 'The password must have 6 characters').isLength({min: 6})],
    UserController.createUser);
module.exports = router;