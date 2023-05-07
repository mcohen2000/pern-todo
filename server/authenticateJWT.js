const jwt = require('jsonwebtoken');

module.exports.isLoggedIn = async (req, res, next) => {
  try {
    if (!req.cookies.token){
      return res.status(401).json({msg: "Invalid Token"})
    }
    const user = await jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    console.log(user);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
  };