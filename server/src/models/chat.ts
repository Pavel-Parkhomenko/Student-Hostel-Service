import mongoose, {model} from "mongoose";
const chatSchema = new mongoose.Schema({
  name: { type: String, required: false },
  messages: {
    type: [{
      text: { type: String, required: false },
      user: { type: String, required: false },
      createdAt: { type: Date, default: Date.now },
    }]
  },
});

module.exports = model('chats', chatSchema);