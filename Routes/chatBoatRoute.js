const express = require("express")

const ChatRouter = express.Router()
const {Userauth} = require("../Middleware/userAuth")
const {CreateChat,UpdateChat,DeleteChat,Allchat} = require("../Controller/chatboatController")

ChatRouter.get("/all",Userauth,Allchat)
ChatRouter.post("/create",Userauth,CreateChat)
ChatRouter.put("/:chatbotId",Userauth,UpdateChat)
ChatRouter.delete("/:chatbotId",Userauth,DeleteChat)

module.exports = {ChatRouter}