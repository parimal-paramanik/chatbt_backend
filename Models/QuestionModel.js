
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: String, // The content of the question
  type: String, // Question type (e.g., multiple-choice, open-ended)
  chatbot: { type: mongoose.Schema.Types.ObjectId, ref: 'Chatbot' }
});

const questionModel= mongoose.model('Question', questionSchema)
module.exports ={questionModel}
