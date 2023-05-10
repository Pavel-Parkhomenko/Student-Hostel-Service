const mongoose = require('mongoose');
const express = require('express');
const app = express()
import { Chat } from './models/chat'

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/diplom_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const http = require('http').createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const server = http.listen(5001, () => {
  console.log('server is running on port', server.address().port);
});

io.on('connection', async (socket) => {
  console.log('user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('message', async (data) => {
    const chat = await Chat.findOne({ _id: data.id });
    // @ts-ignore
    chat.messages = [...chat.messages, {
      user: data.user as string,
      text: data.text as string
    }]
    await chat.save()
    socket.emit('message', {
      user: data.user,
      text: data.text,
      createdAt: Date.now,
    });
  });

});

module.exports = app