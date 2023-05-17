import { Mentor } from '../models/mentor'
import { Student } from '../models/student'
import { Hostel } from '../models/hostel'
import { Router } from 'express'

const router = Router()

router.post('/get-chats', async (req, res) => {
  try {
    const { id, role } = req.body
    if(role === 'mentor') {
      const model = await Mentor.findOne({ _id: id });
      return res.status(200).json({data: model.chats || [], message: 'Данные найдены'})
    } else {
      const model = await Student.findOne({ _id: id });
      return res.status(200).json({data: model.chats || [], message: 'Данные найдены'})
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({message: 'Что-то пошло не так - сервер'})
  }
});

router.post('/get-cost-hostel', async (req, res) => {
  try {
    const hostel = (await Hostel.find())[0]
    return res.status(200).json({data: hostel.costHostel, message: 'Данные найдены'})
  } catch (err) {
    console.log(err)
    return res.status(500).json({message: 'Что-то пошло не так - сервер'})
  }
});

module.exports = router