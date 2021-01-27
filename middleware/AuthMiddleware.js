const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');
    if(!token){
        res.status(401).json({msg: 'No token, unauthorized.'})
    }
    try{
        const cypher = jwt.verify(token, process.env.SECRET_WORD);
        req.user = cypher.user;
        next();
    }catch (e) {
        res.status(401).json({msg: 'Invalid token'});
    }
    console.log(token);
};