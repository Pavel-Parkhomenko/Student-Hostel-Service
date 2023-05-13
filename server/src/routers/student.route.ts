import path from "path";
import { Router } from 'express'
import { Student } from '../models/student'
import { Account } from '../models/account'

const router = Router();
router.post('/import-students',
  async (req, res) => {
    try {
      const { students, type } = req.body
      let stObjs = []
      for (let i = 1; i < students.length; i++) {
        stObjs.push({
          firstName: students[i][0],
          secondName: students[i][1],
          middleName: students[i][2],
          formEducation: students[i][3],
          balls: 0,
          numberTest: students[i][4] as number,
          room: {
            floor: students[i][5] as number,
            block: students[i][6] as number,
            apartament: students[i][7] as number,
          }
        })
      }
      if(type === 'add') {
        Student.insertMany(stObjs).then(() => {
          return res.status(200).json({message: 'Данные успешны выгружены'})
        }).catch((err) => {
          return res.status(400).json({message: 'Не удалось выгрузить данные'})
        })
      } else {
        await Account.deleteMany({ role: 'student'})
        await Student.deleteMany()
        Student.insertMany(stObjs).then(() => {
          return res.status(200).json({message: 'Данные успешны выгружены'})
        }).catch((err) => {
          return res.status(400).json({message: 'Не удалось выгрузить данные'})
        })
      }

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

router.get('/get-places', async (req, res) => {
  try {
    const data = await Student.find()
    const resStudents = []

    for (let i = 0; i < data.length; i++) {
      if(!resStudents[data[i].room?.floor]) {
        resStudents[data[i].room?.floor] = [data[i].room]
      } else {
        resStudents[data[i].room?.floor] = [...resStudents[data[i].room?.floor], data[i].room]
      }
    }
    return res.status(200).json({data: resStudents, message: 'Данные загруженны'})

  } catch (err) {
    console.log(err.message)
    return res.status(500).json({message: 'Что-то пошло не так - server'})
  }
})

router.post('/add-tech', async (req, res) => {
  try {
    const {numberTest, model, number, type} = req.body
    const student = await Student.findOne({numberTest: numberTest})
    const update = {
      privateTechs: [
        ...student.privateTechs, {
          model,
          number,
          type,
        }
      ]
    }
    await Student.findOneAndUpdate({numberTest: numberTest}, update)
    return res.status(200).json({message: 'Новые данные добавлены'})
  } catch (err) {
    return res.status(500).json({message: 'Что-то пошло не так'})
  }
})

router.post('/update-balls', async (req, res) => {
  try {
    const {numberTest, balls} = req.body
    const student = await Student.findOne({numberTest: numberTest})
    let update = {}
    if(!student.balls) {
      update = {
        balls: Number(balls)
      }
    } else {
      update = {
        balls: Number(balls) + Number(student.balls)
      }
    }
    const newStudent = await Student.findOneAndUpdate({numberTest: numberTest}, update, {
      new: true
    })
    return res.status(200).json({data: newStudent.balls, message: 'Данные обновлены'})
  } catch (err) {
    return res.status(500).json({message: 'Что-то пошло не так'})
  }
})

const multer  = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/students')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop())
  }
})

const upload = multer({ storage: storage })

interface MulterRequest extends Request {
  file: any;
}

router.post('/update-info', upload.single("file"), async (req, res) => {
  try {
    const { numberTest, email, login, newPassword, oldPassword } = req.body
    const img = (req as unknown as MulterRequest).file?.filename
    const student = await Student.findOne({numberTest: numberTest})
    const acc = await Account.findOne({login: student.account?.login})

    if(acc.password !== oldPassword && oldPassword !== '') {
      return res.status(400).json({message: 'Пароль должен совпадать со старым паролем'})
    }

    const previewAcc = await Account.findOne({login: login})
    if(previewAcc) {
      return res.status(400).json({message: 'Такой логин уже существует'})
    }

    let update = {
      email: student.email,
      'account.login': student.account?.login,
    }
    let accUpdate = {
      login: acc.login,
      password: acc.password
    }

    if(email !== '') update.email = email
    if(login !== '') {
      update['account.login'] = login
      accUpdate.login = login
    }
    if(newPassword !== '') accUpdate.password = newPassword

    await Account.findOneAndUpdate({login: student.account?.login}, accUpdate)
    await Student.findOneAndUpdate({numberTest: numberTest}, update)
    if(img){
      await Student.findOneAndUpdate({numberTest: numberTest}, {
        img: img
      })
    }
    const studentNew = await Student.findOne({ numberTest: numberTest})
    return res.status(200).json({data: studentNew, message: 'Данные обновлены'})
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({message: 'Что-то пошло не так'})
  }
})

router.get('/load', function(req, res) {
  try {
    const img = req.query.img
    if(img === 'undefined') return res.status(400)
    const imagePath = path.join("D:", "diplom-app", "server", 'uploads', 'students', `${img}`);
    if(!imagePath) return res.status(400)
    res.sendFile(imagePath);
  } catch (err){
    return res.status(400)
  }
});

router.post('/get-remarks', async (req, res) => {
  try {
    const { numberTest } = req.body
    const data = await Student.findOne({numberTest: numberTest})
    return res.status(200).json({data: data.remarks || [], message: 'Данные загруженны'})
  } catch (err) {
    console.log(err)
    return res.status(500).json({message: 'Что-то пошло не так - сервер'})
  }
})

router.post('/add-student', async (req, res) => {
  try {
    const { firstName, secondName, middleName,
      formEducation, floor, block, apartament
    } = req.body

    const student = new Student({
      firstName, secondName, middleName, formEducation,
      room: {
        floor, block, apartament
      }
    })
    await student.save()
    return res.status(200).json({message: 'Новый студент добавлен'})
  } catch (err) {
    console.log(err)
    return res.status(500).json({message: 'Что-то пошло не так - сервер'})
  }
})

module.exports = router