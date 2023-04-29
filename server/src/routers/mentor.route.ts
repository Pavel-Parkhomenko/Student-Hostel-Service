const {Router} = require('express');
const {check, validationResult} = require('express-validator')
const Mentor = require('../models/mentor')
import {IMentor} from '../interfaces'

const router = Router()

router.post('/info-mentor', async (req, res) => {
  try {
    const { login } = req.body
    const model: IMentor | null = await Mentor.findOne({ "account.login": login });
    console.log('model')
    console.log(model)
    if(!model) return res.status(400).json({message: 'Данных нет'})
    return res.status(200).json({data: model, message: 'Данные найдены'})
  } catch (err) {
    return res.status(500).json({message: 'Что-то пошло не так'})
  }
});


module.exports = router