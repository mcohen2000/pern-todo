const jwt = require('jsonwebtoken');

module.exports.isLoggedIn = (req, res, next) => {
  try {
    if (!req.cookies[`${process.env.COOKIE_NAME}`]){
      return res.status(401).json({msg: "Invalid Token"})
    }
    const user = jwt.verify(req.cookies[`${process.env.COOKIE_NAME}`], process.env.JWT_SECRET);
    console.log(user);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
  };