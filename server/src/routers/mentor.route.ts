import path from "path"
import { Router } from 'express'
import { Mentor } from '../models/mentor'
import { IMentor } from '../interfaces'

const router = Router()

router.post('/info-mentor', async (req, res) => {
  try {
    const { login } = req.body
    const model: IMentor | null = await Mentor.findOne({ "account.login": login });
    if(!model) return res.status(400).json({message: 'Данных нет'})
    return res.status(200).json({data: model, message: 'Данные найдены'})
  } catch (err) {
    return res.status(500).json({message: 'Что-то пошло не так'})
  }
});

router.get('/load', function(req, res) {
  const img: string = String(req.query.img)
  if(img === 'undefined') return res.status(400)
  const imagePath = path.join("D:", "diplom-app", "server", 'uploads', img);
  res.sendFile(imagePath);
});

module.exports = router