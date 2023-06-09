const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const checkEmailExists = await pool.query("SELECT * from users WHERE email = $1", [email]);
    console.log(checkEmailExists);
    if (checkEmailExists.rows.length>0){
      return res.status(403).json({msg: "An account with this email address already exists!"})
    }
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    const newUser = await pool.query(
      "INSERT INTO users (firstname, lastname, email, hashedpassword) VALUES ($1, $2, $3, $4) RETURNING *",
      [firstname, lastname, email, hashedPassword]
    );
    const token = jwt.sign(
      {
        id: newUser.rows[0].user_id,
        email: newUser.rows[0].email,
        firstname: newUser.rows[0].firstname,
        lastname: newUser.rows[0].lastname,
      },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 * 24 * 7 }
    );
    res.cookie(process.env.COOKIE_NAME, token, {
      domain: process.env.COOKIE_URL,
      // withCredentials: true,
      httpOnly: true,
      sameSite: process.env.SECURE_COOKIES === "true" ? "none" : "strict",
      secure: process.env.SECURE_COOKIES === "true" ? true : false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      // signed: true,
    });
    res.status(200).json({ email: newUser.rows[0].email, id: newUser.rows[0].user_id });
  } catch (error) {
    console.log(error);
  }
};
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json({ msg: "Email or Password is incorrect." });
    }
    const checkPassword = await bcrypt.compareSync(
      password,
      user.rows[0].hashedpassword
    );
    if (!checkPassword) {
      return res.status(401).json({ msg: "Email or Password is incorrect." });
    }
    const token = jwt.sign(
      {
        id: user.rows[0].user_id,
        email: user.rows[0].email,
        firstname: user.rows[0].firstname,
        lastname: user.rows[0].lastname,
      },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 * 24 * 7 }
    );
    res.cookie(process.env.COOKIE_NAME, token, {
      domain: process.env.COOKIE_URL,
      // withCredentials: true,
      httpOnly: true,
      sameSite: process.env.SECURE_COOKIES === "true" ? "none" : "strict",
      secure: process.env.SECURE_COOKIES === "true" ? true : false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      // signed: true,
    });
    res.status(200).json({ email: user.rows[0].email, id: user.rows[0].user_id });
  } catch (error) {
    console.log(error);
  }
};
module.exports.logout = async (req, res) => {
  try {
    req.user = undefined;
    res.clearCookie(process.env.COOKIE_NAME, {
      domain: process.env.COOKIE_URL,
      // withCredentials: true,
      httpOnly: true,
      sameSite: process.env.SECURE_COOKIES === "true" ? "none" : "strict",
      secure: process.env.SECURE_COOKIES === "true" ? true : false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      // signed: true,
    });
    res.json({ msg: "Successfully logged out!" });
  } catch (error) {
    console.log(error);
  }
};
module.exports.auth = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: "Not A Valid User" });
    }
    res.status(200).json(req.user);
  } catch (error) {
    console.log(error);
  }
};
