import { Student } from '../models/student'
import { Mentor } from '../models/mentor'
const { Router } = require('express')
import { Chat } from '../models/chat'

const router = Router()

router.get('/create-chat',async (req, res) => {
  try {
    const chat = new Chat({})
    const newChat = await chat.save()
    return res.status(200).json({data: { id: newChat._id }, message: 'Чат создан'})
  } catch(err) {
    return res.status(500).json({message: 'Что-то пошло не так - сервер'})
  }
})

router.post('/create-chat',async (req, res) => {
  try {
    const { arrayId, name, idMentor } = req.body
    const chat = await Chat.create({
      name,
      messages: [],
    })
    for (let i = 0; i < arrayId.length; i++) {
      const doc = await Student.findById(arrayId[i])
      doc.chats = [...doc.chats, chat._id]
      await doc.save();
    }
    const mentor = await Mentor.findById(idMentor)
    mentor.chats = [...mentor.chats, chat._id]
    await mentor.save()
    return res.status(200).json({data: '', message: 'Чат создан'})
  } catch(err) {
    return res.status(500).json({message: 'Что-то пошло не так - сервер'})
  }
})

router.post('/get-chats',async (req, res) => {
  try {
    const { idChats } = req.body
    const chats = []
    for (let i = 0; i < idChats.length; i++) {
      const doc = await Chat.findById(idChats[i])
      chats.push(doc)
    }
    return res.status(200).json({data: chats, message: 'Чат создан'})
  } catch(err) {
    return res.status(500).json({message: 'Что-то пошло не так - сервер'})
  }
})

router.post('/get-messages',async (req, res) => {
  try {
    const { id } = req.body
    const doc = await Chat.findOne({ _id: id})
    return res.status(200).json({data: doc, message: 'Чат получен'})
  } catch(err) {
    return res.status(500).json({message: 'Что-то пошло не так - сервер'})
  }
})

module.exports = router