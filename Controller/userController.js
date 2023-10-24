
const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { userModel } = require('../Models/UserModel');
 
// user signup logic ====>
const signup =async(req,res)=>{
   try {
    const { email, password, name } = req.body;
    const isUserPresent = await userModel.findOne({ email });

     // all fields presence check
     if (!email || !password || ! name) {
        return res.status(400).send({ msg: "All feilds are required" });
      };
       // User already present in database.
    if (isUserPresent) {
        return res
          .status(400)
          .send({ msg: "Email already taken, try another email or login" });
      }
      const hashedPassword = bcrypt.hashSync(password, 5);
      const newUser = new userModel({ ...req.body, password: hashedPassword });
      await newUser.save();
      res.status(200).send({ msg: "Registration successful", user: newUser });
   } catch (error) {
    res.status(500).send({ error: "Registration failed", msg: error.message });
   }
}

// user login
const login =async(req,res)=>{
    try {
        const { email, password } = req.body;
        const isUserPresent = await userModel.findOne({ email });
        if (!isUserPresent)
       return res
        .status(400)
        .send({ msg: "Not a existing user, please register" });

    // Password verification
    const isPasswordCorrect = bcrypt.compareSync(
      password,
      isUserPresent.password
    );
    if (!isPasswordCorrect)
      return res.status(400).send({ msg: "Wrong credentials" });
     // Generating access token

     const accessToken = jwt.sign(
        { userId: isUserPresent._id },
        process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: 60 * 60 * 24 }
      );
     const refreshToken = jwt.sign(
        { userId: isUserPresent._id },
        process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
        { expiresIn: 60 * 60 * 24 }
      );

      res.status(200).send({ msg: "Login success", accessToken,refreshToken});

    }catch(error){
        res.status(500).send({ msg: error.message });
    }
}

module.exports ={signup,login}
