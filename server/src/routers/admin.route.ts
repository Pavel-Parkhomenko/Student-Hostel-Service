import {IMentor} from "../interfaces";

const { Router } = require('express');
const Mentor = require('../models/mentor')

const router = Router()

router.get('/get-employee', async (req, res) => {
  try {
    const employee = await Mentor.find()
    return res.status(200).json({data: employee, message: 'Данные получены'})
  } catch (err) {
    return res.status(500).json({message: 'Что-то пошло не так'})
  }
});

module.exports = router