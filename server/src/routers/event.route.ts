import { Router } from 'express'
import path from "path"
import { Event } from '../models/event'
import multer from 'multer'

const router = Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/events')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop())
  }
})

interface MulterRequest extends Request {
  file: any;
}

const upload = multer({ storage: storage })
router.post('/create-event', upload.single("file"), async (req, res) => {
  try {
    const { header, description, dateEvent, placeEvent } = req.body
    const img = (req as unknown as MulterRequest).file.filename //img.filename
    const candidateEvent = new Event({
      header,
      description,
      img,
      dateEvent,
      placeEvent,
    })
    await candidateEvent.save()
    return res.status(200).json({message: 'Мероприятие созданно'})
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
  const img: string = String(req.query.img)
  const imagePath = path.join("D:", "diplom-app", "server", 'uploads', 'events', img);
  res.sendFile(imagePath);
});

module.exports = router