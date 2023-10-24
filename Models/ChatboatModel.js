// models/chatbot.js
const mongoose = require('mongoose');

const chatbotSchema =  mongoose.Schema({
  title: String,
  description: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }, // Link chatbot to a user
});

const chatboatModel= mongoose.model('Chatbot', chatbotSchema)

module.exports = {chatboatModel}
