//routes for the users.
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const AuthController = require('../controllers/AuthController');
const AuthMiddleware = require('../middleware/AuthMiddleware');
// api/auth
router.post('/', [
        check('email', 'Add a valid email').isEmail(),
        check('password', 'The password must have 6 characters').isLength({min: 6})],
    AuthController.authUser
);
//obtain user
router.get('/', AuthMiddleware, AuthController.userAuthenticated);
module.exports = router;