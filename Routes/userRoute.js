
const express = require("express")
const { signup, login } = require("../Controller/userController")
const {passport} = require("../Middleware/googleauth")
const {userModel} = require("../Models/UserModel")
const UserRouter= express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()

// signup 
UserRouter.post("/signup",signup)
// login 
UserRouter.post("/login",login)


UserRouter.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

UserRouter.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/login",
      session: false,
    }),

    async function (req, res) {
        try {
            const isPresent = await userModel.findOne({ email: req.user.email });
            // console.log(isPresent)

            if (isPresent) {
                const token = jwt.sign({ id: isPresent._id },
                     process.env.JWT_ACCESS_TOKEN_SECRET_KEY, 
                     { expiresIn: 60 * 60 * 24})
                res.cookie("token", token, { maxAge: 60 * 60 * 24 })
                // res.status(202).json({ msg: "login done successfull using google auth" })
                res.redirect('http://localhost:3000/Dashboard')  
                      

            }
            else {
                req.user.password = bcrypt.hashSync(req.user.password, 2);
                const user = new userModel(req.user);
                await user.save();

                const isPresent = await userModel.findOne({ email: req.user.email });
                const token = jwt.sign({ id: isPresent._id }, process.env.JWT_ACCESS_TOKEN_SECRET_KEY)
                res.cookie("token", token, { maxAge: 60 * 60 * 24})
                res.redirect('http://localhost:3000/Dashboard') 

                
            }
        }  catch (error) {
            console.error(error);
           res.status(500).send({ msg: "Internal server error" });
          }

    }
);


module.exports ={UserRouter}