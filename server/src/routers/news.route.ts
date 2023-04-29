import path from "path";

const {Router} = require('express');
const {check, validationResult} = require('express-validator')
const News = require('../models/news')
import {INews} from '../interfaces'

const router = Router()

const multer  = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/news')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop())
  }
})

const upload = multer({ storage: storage })
router.post('/create-section', upload.single("file"), async (req, res) => {
  try {
    const { header, description, id } = req.body
    const img = req.file //img.filename
    const candidateNews = await News.findById(id)
    await News.updateOne({ _id: id }, {
      body: [...candidateNews.body, { header, description, img: img.filename}],
    })
    return res.status(200).json({message: 'Новость создана'})
  } catch(err) {
    console.log(err.message)
    return res.status(500).json({message: 'Что-то пошло не так - сервер'})
  }
})

router.post('/create-news',async (req, res) => {
  try {
    const { mentor } = req.body
    const news = new News({
      mentor,
      dateCreate: '10.10.2023 18:50',
    })
    const newNews = await news.save()
    console.log('newNews')
    console.log(newNews)
    return res.status(200).json({data: { id: newNews._id }, message: 'Новость создана'})
  } catch(err) {
    console.log('/news/create-news ', err.message)
    return res.status(500).json({message: 'Что-то пошло не так - сервер'})
  }
})

router.get('/get-news',async (req, res) => {
  try {
    const data = await News.find()
    const news = []
    for(let i = 0; i < data.length; i++) {
      if(!data[i].body.length) {
        await News.deleteOne({ _id: data[i]._id });
      } else {
        news.push(data[i])
      }
    }

    return res.status(200).json({data: news, message: 'Новости получены'})
  } catch(err) {
    console.log('/news/get-news ', err.message)
    return res.status(500).json({message: 'Что-то пошло не так - сервер'})
  }
})

router.get('/get-news-id',async (req, res) => {
  try {
    const id = req.query.id
    const data = await News.findOne({ _id: id })
    return res.status(200).json({data: data, message: 'Новость получена'})
  } catch(err) {
    console.log('/news/get-news-id ', err.message)
    return res.status(500).json({message: 'Что-то пошло не так - сервер'})
  }
})

router.get('/load', function(req, res) {
  const img = req.query.img
  const imagePath = path.join("D:", "diplom-app", "server", 'uploads', 'news', img);
  res.sendFile(imagePath);
});

module.exports = router