const {Router} = require('express')
const Student = require('../models/student')
import {IStudent} from '../interfaces'

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

router.get('/get-info', async (req, res) => {
  try {
    const data = await Student.find()
    const resStudents = []

    for (let i = 0; i < data.length; i++) {
      resStudents.push({
        id: data[i]._id,
        firstName: data[i].firstName,
        middleName: data[i].middleName,
        secondName: data[i].secondName,
        numberTest: data[i].numberTest
      })
    }
    return res.status(200).json({data: resStudents, message: 'Данные загруженны'})

  } catch (err) {
    return res.status(500).json({message: 'Что-то пошло не так'})
  }
})

router.get('/get-student-id', async (req, res) => {
  try {
    const nt = req.query.id
    const data = await Student.findOne({numberTest: nt})
    return res.status(200).json({data: data, message: 'Данные загруженны'})
  } catch (err) {
    return res.status(500).json({message: 'Что-то пошло не так'})
  }
})

router.post('/change-status-claim', async (req, res) => {
  try {
    const { numberTest, ind } = req.body
    const data = await Student.findOne({numberTest: numberTest})
    data.remarks[ind].status = 1
    await data.save()
    return res.status(200).json({message: 'Статус изменен'})
  } catch (err) {
    console.log(err)
    return res.status(500).json({message: 'Что-то пошло не так - сервер'})
  }
})

router.post('/create-claim', async (req, res) => {
  try {
    const {numberTest, header, text, mentor, dateAndTime} = req.body
    console.log(numberTest, header, text, mentor, dateAndTime)
    const student = await Student.findOne({numberTest: numberTest})
    const update = {
      remarks: [
        ...student.remarks, {
          dateAndTime,
          header,
          text,
          mentor,
          status: 0
        }
      ]
    }
    await Student.findOneAndUpdate({numberTest: numberTest}, update)
    return res.status(200).json({message: 'Данные обновлены'})
  } catch (err) {
    return res.status(500).json({message: 'Что-то пошло не так'})
  }
})

module.exports = router