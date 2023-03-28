const { Router } = require('express')
const Student = require('../models/student')
import { IStudent } from '../interfaces'

const router = Router();
router.post('/import-students',
  async (req, res) => {
    try {
      const students = req.body
      let stObjs = []
      for (let i = 1; i < students.length; i++) {
        stObjs.push({
          firstName: students[i][0],
          secondName: students[i][1],
          middleName: students[i][2],
          formEducation: students[i][3],
          numberTest: students[i][4] as number,
          room: {
            floor: students[i][5] as number,
            block: students[i][6] as number,
            apartament: students[i][7] as number,
          }
        })
      }
      console.log(stObjs)
      console.log(typeof stObjs[1].numberTest)
      Student.insertMany(stObjs).then(() => {
        return res.status(200).json({message: 'Данные успешны выгружены'})
      }).catch((err) => {
        console.log(err)
        return res.status(400).json({message: 'Не удалось выгрузить данные'})
      })

    } catch (err) {
      return res.status(500).json({message: 'Что-то пошло не так'})
    }
  });

module.exports = router