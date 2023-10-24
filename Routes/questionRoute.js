const express = require("express")

const QueRouter = express.Router()
const {Userauth} = require("../Middleware/userAuth")
const {CreateQue,UpdateQue,DeleteQue,AllQue} = require("../Controller/questionController")


QueRouter.get("/all",Userauth,AllQue)
QueRouter.post("/create",Userauth,CreateQue)
QueRouter.put("/:questionId",Userauth,UpdateQue)
QueRouter.delete("/:questionId",Userauth,DeleteQue)

module.exports = {QueRouter}