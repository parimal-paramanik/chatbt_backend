

const mongoose = require("mongoose")

const userSchema= mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: {type: String,required: true },
  name: {type:String,required: true},
   googleId: {type:String,required:false},
},
  {
    versionKey: false,
  }

)

const userModel= mongoose.model("user",userSchema)

module.exports= {userModel}