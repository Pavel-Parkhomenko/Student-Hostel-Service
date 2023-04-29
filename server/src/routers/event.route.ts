const {Router} = require('express');
const {check, validationResult} = require('express-validator')
import path from "path"
const Event = require('../models/event')
import {IEvent} from '../interfaces'

const router = Router()

const multer  = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/events')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop())
  }
})

const upload = multer({ storage: storage })
router.post('/create-event', upload.single("file"), async (req, res) => {
  try {
    const { header, description, dateEvent, placeEvent } = req.body
    const img = req.file.filename //img.filename
    const candidateEvent = new Event({
      header,
      description,
      img,
      dateEvent,
      placeEvent,
    })
    await candidateEvent.save()
    return res.status(200).json({message: 'Событие созданно создана'})
  } catch(err) {
    console.log(err.message)
    return res.status(500).json({message: 'Что-то пошло не так - сервер'})
  }
})

router.get('/get-events',async (req, res) => {
  try {
    const data = await Event.find()
    return res.status(200).json({data: data, message: 'События получены'})
  } catch(err) {
    return res.status(500).json({message: 'Что-то пошло не так - сервер'})
  }
})

router.get('/load', function(req, res) {
  const img = req.query.img
  const imagePath = path.join("D:", "diplom-app", "server", 'uploads', 'events', img);
  res.sendFile(imagePath);
});

module.exports = router