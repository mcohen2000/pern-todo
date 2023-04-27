const jwt = require('jsonwebtoken');

module.exports.isLoggedIn = (req, res, next) => {
    const user = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    console.log(user);
    req.user = user;
    next();
  };