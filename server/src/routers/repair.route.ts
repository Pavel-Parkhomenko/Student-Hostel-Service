import { Router } from 'express'
import { Repair } from '../models/repair'
import { getDateAndTime } from '../utils'

const router = Router();

router.get('/get-repairs-all', async (req, res) => {
  try{
    const repairs = await Repair.find()
    return res.status(200).json({data: repairs, message: 'Данные получены'})
  } catch(err) {
    return res.status(500).json({message: 'Что-то пошло не так'})
  }
})

router.post('/get-repairs-id', async (req, res) => {
  try{
    const { numberTest } = req.body
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
    const repair = new Repair()
    repair.student = user
    repair.header = header
    repair.description = description
    repair.room = room
    repair.dateCreate = getDateAndTime()
    repair.status = 0 //0 - только сделан 1 - в процессе 2 - завершен
    const newRepair = await repair.save()
    return res.status(200).json({data: newRepair, message: 'Данные сохранены'})
  } catch(err) {
    return res.status(500).json({message: 'Что-то пошло не так'})
  }
})

router.post('/change-run', async (req, res) => {
  try {
    const { master, id } = req.body
    const repair = await Repair.findOne({ _id: id })
    repair.status = 1
    repair.run = {
      master,
      date: getDateAndTime()
    }
    const newRepair = await repair.save()
    return res.status(200).json({data: newRepair, message: 'Данные сохранены'})
  } catch(err) {
    return res.status(500).json({message: 'Что-то пошло не так'})
  }
})

router.post('/change-status-to-2', async (req, res) => {
  try {
    const { id } = req.body
    const repair = await Repair.findOne({ _id: id })
    repair.status = 2
    const newRepair = await repair.save()
    return res.status(200).json({data: newRepair, message: 'Данные сохранены'})
  } catch(err) {
    return res.status(500).json({message: 'Что-то пошло не так'})
  }
})

module.exports = router