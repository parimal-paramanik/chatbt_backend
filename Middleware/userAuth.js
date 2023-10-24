const jwt = require("jsonwebtoken");
require("dotenv").config()

const Userauth = async(req,res,next)=>{
  try {
    const token = req.headers.authorization;
    if(!token) {
        return res.status(404).send({msg:"needed authorization"})
    }
    const isvalidtoken= jwt.verify(token,process.env.JWT_ACCESS_TOKEN_SECRET_KEY);
             req.body.userId= isvalidtoken.userId
             next();
    } catch (error) {
  res.status(500).send({ message: "Authentication failed" });
}
}

module.exports = {Userauth}