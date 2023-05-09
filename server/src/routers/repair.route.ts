const { Router } = require('express')
const Repair = require('../models/repair')
import { getDateAndTime } from '../utils'
const router = Router();

router.get('/get-repairs-all', async (req, res) => {
  try{
    console.log('repairs')
    const repairs = await Repair.find()
    return res.status(200).json({data: repairs, message: 'Данные получены'})
  } catch(err) {
    return res.status(500).json({message: 'Что-то пошло не так'})
  }
})

router.post('/get-repairs-id', async (req, res) => {
  try{
    const { numberTest } = req.body
    console.log(numberTest)
    const condition = { "student.numberTest": numberTest };
    const repairs = await Repair.find(condition)
    return res.status(200).json({data: repairs, message: 'Данные получены'})
  } catch(err) {
    console.log(err.message)
    return res.status(500).json({message: 'Что-то пошло не так'})
  }
})

router.post('/create', async (req, res) => {
  try {
    const { user, header, description, room } = req.body
    console.log(user, header, description, room)
    const repair = new Repair()
    repair.student = user
    repair.header = header
    repair.description = description
    repair.room = room
    repair.dateCreate = getDateAndTime()
    repair.status = 0
    const newRepair = await repair.save()
    return res.status(200).json({data: newRepair, message: 'Данные сохранены'})
  } catch(err) {
    return res.status(500).json({message: 'Что-то пошло не так'})
  }
})

module.exports = router