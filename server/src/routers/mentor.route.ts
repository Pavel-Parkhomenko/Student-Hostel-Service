import path from "path"
import { Router } from 'express'
import { Mentor } from '../models/mentor'
import { IMentor } from '../interfaces'
import { Account } from "../models/account"
import { Student } from "../models/student";
const multer  = require("multer")

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
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
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
    const { id, login, newPassword, oldPassword, phone, email } = req.body
    const img = (req as unknown as MulterRequest).file?.filename
    const mentor = await Mentor.findOne({_id: id})
    const acc = await Account.findOne({login: mentor.account?.login})

    if(acc.password !== oldPassword && oldPassword !== '') {
      return res.status(400).json({message: 'Пароль должен совпадать со старым паролем'})
    }

    const previewAcc = await Account.findOne({login: login})
    if(previewAcc) {
      return res.status(400).json({message: 'Такой логин уже существует'})
    }

    let update = {
      'account.login': login || mentor.account?.login,
      img: img || mentor.img,
      phone: phone || mentor.phone || '',
      email: email || mentor.email || '',
    }

    let accUpdate = {
      login: login || acc.login,
      password: newPassword || acc.password
    }

    await Account.findOneAndUpdate({login: mentor.account?.login}, accUpdate)
    const newMentor = await Mentor.findOneAndUpdate({_id: id}, update, {
      new: true
    })

    return res.status(200).json({data: newMentor, message: 'Данные обновлены'})
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({message: 'Что-то пошло не так'})
  }
})

router.post('/get-students-by-impact', async (req, res) => {
  try {
    const { impact } = req.body
    const data = await Student.find()
    const students  = []
    for(let i = 0; i < data.length; i++) {
      if(data[i].room.floor >= impact.from && data[i].room.floor <= impact.to) {
        students.push(data[i])
      }
    }
    return res.status(200).json({data: students, message: 'Данные загруженны'})
  } catch (err) {
    return res.status(500).json({message: 'Что-то пошло не так'})
  }
})

router.post('/update-balls-v2', async (req, res) => {
  try {
    const { numberTest, num, summary } = req.body
    const student = await Student.findOne({numberTest: numberTest})

    let update = {}
    if (!student.ballsInfo || student.ballsInfo?.length === 0) {
      update = {
        ballsInfo: [{
          num: Number(num), summary
        }],
        balls: Number(num),
      }
    } else {
      update = {
        ballsInfo: [...student.ballsInfo, { num, summary }],
        balls: Number(num) + Number(student.balls)
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

module.exports = router