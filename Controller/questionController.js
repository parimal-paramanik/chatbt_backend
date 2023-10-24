const express = require('express');
const {questionModel}= require("../Models/QuestionModel")
const {chatboatModel} = require("../Models/ChatboatModel")
const {userModel}= require("../Models/UserModel")


const AllQue = async(req,res)=>{
    try {
      // asyncronouse opeartion 
        const {chatbotId} = req.body
      const chatboat= await questionModel.find({chatbot:chatbotId})
      res.send(chatboat)
    } catch (error) {
      res.send(error.message)
    }
  }
  


const CreateQue = async (req, res) => {
    try {
      const { text, type, chatbotId } = req.body;
  
      // Check if the user has permission to add a question to the chatbot
      const chatbot = await chatboatModel.findOne({ _id: chatbotId, owner: req.userId });
      if (!chatbot) {
        return res.status(404).send('chatboat not found');
      }
  
      const question = new questionModel({ text, type, chatbot: chatbotId });
  
      // Save the question
      await question.save();
      res.status(201).send(question);
    } catch (error) {
      res.status(500).json({ error: 'Error creating question' });
    }
  }
  

const UpdateQue= async(req,res)=>{

}

const DeleteQue = async(req,res)=>{

}

module.exports = {CreateQue,UpdateQue,DeleteQue,AllQue}