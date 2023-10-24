const express = require('express');
const {userModel}= require("../Models/UserModel")
const {chatboatModel} = require("../Models/ChatboatModel")


const Allchat = async(req,res)=>{
  try {
    const chatboat= await chatboatModel.find({owner:req.userId})
    res.send(chatboat)
  } catch (error) {
    res.send(error.message)
  }
}
// create  a chat

const CreateChat = async (req, res) => {
    try {
      const { title, description } = req.body;
      const owner = req.userId;
      const chatbot = new chatboatModel({ title, description, owner });

      await chatbot.save();
      return res.status(200).json({chatbot: chatbot});
    } catch (error) {
      return res.status(500).json({ error: 'Error creating chatbot' });
    }
  }
  


// update a chat

const UpdateChat = async (req, res) => {
    try {
      // Check if the user is the owner of the chatbot
      const owner = req.userId;
      const chatbotId = req.params.chatbotId;
  
      // Find the chatbot by chatbotId and owner
      const chatbot = await chatboatModel.findOne({ _id: chatbotId, owner });
  
      if (!chatbot) {
        return res.status(404).json({ error: 'Chatbot not found or you are not the owner' });
      }
  
      // Update the chatbot with the request body
      chatbot.set(req.body);
      const updatedChatbot = await chatbot.save();
  
      res.json(updatedChatbot);
    } catch (error) {
      res.status(500).json({ error: 'Error updating chatbot' });
    }
  }
  

// delete  a chat

const DeleteChat = async (req, res) => {
    try {
      // Check if the user is the owner of the chatbot
      const owner = req.userId;
      const chatbotId = req.params.chatbotId;
  
      // Find the chatbot by chatbotId and owner
      const chatbot = await chatboatModel.findOne({ _id: chatbotId, owner });
  
      if (!chatbot) {
        return res.status(404).json({ error: 'Chatbot not found or you are not the owner' });
      }
  
      // Delete the chatbot
      await chatboatModel.findByIdAndRemove(chatbotId);
  
      res.json({ message: 'Chatbot deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting chatbot' });
    }
  }
  



module.exports = {CreateChat,UpdateChat,DeleteChat,Allchat}