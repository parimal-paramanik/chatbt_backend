const express= require('express')
const { Connection } = require('./config/db')
const session = require('express-session');
const { UserRouter } = require('./Routes/userRoute')
const port= process.env.PORT
const app= express()
app.use(express.json())
const cors= require("cors");
const { ChatRouter } = require('./Routes/chatBoatRoute');
const { QueRouter } = require('./Routes/questionRoute');

app.get("/",(req,res)=>{
    res.send("Everything is working fine")
})
app.use(cors())

app.use("/user",UserRouter)
app.use("/chatboat",ChatRouter)
app.use("/question",QueRouter)


app.use(
    session({
      secret: "your-secret-key",
      resave: true,
      saveUninitialized: true,
    })
  );

app.listen((port),async(req,res)=>{
    try {
        await Connection
        console.log('server is connected to [MongoDB]')
    } catch (error) {
        console.log(error.message)
    }
    console.log(`server is awake at port ${port}`)
})