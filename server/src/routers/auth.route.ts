import { Router } from 'express'
import { Account } from '../models/account'
import { check, validationResult } from 'express-validator'
import nodemailer from 'nodemailer'
import { Student } from '../models/student'
import { IAccount, IStudent, IMentor } from '../interfaces'
import { Mentor } from '../models/mentor'
import { Admin } from '../models/admin'
const {
  v1: uuidv1,
  v4: uuidv4
} = require('uuid');

const router = Router();

router.post('/login',
  [check('login', 'Неверный логин').isLength({min: 3, max: 15}),
    check('password', 'Неверный пароль').isLength({min: 5, max: 15}),],
  async (req, res) => {
    try {
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некоректные данные при входе"
        })
      }

      const {login, password} = req.body;
      const acc: IAccount | null = await Account.findOne({login: login});
      if (!acc) {
        return res.status(400).json({message: 'Такого логина не существует'})
      }

      if (password !== acc.password)
        return res.status(400).json({message: 'Пользователя с таким паролем не существует'})

      if(acc.role === "mentor") {
        const mentor = await Mentor.findOne({"account.login": login});
        return res.status(200).json({data: { ...mentor, role: "mentor" }, message: 'Вход выполнен успешно'})
      } else if (acc.role === "admin") {
        const admin = await Admin.findOne({"account.login": login});
        return res.status(200).json({data: { ...admin, role: "admin" }, message: 'Вход выполнен успешно'})
      } else if (acc.role === "student") {
        const student: IStudent = await Student.findOne({"account.login": login});
        return res.status(200).json({data: { ...student, role: "student" }, message: 'Вход выполнен успешно'})
      } else {
        return res.status(500).json({message: 'Вход неудачный. Возможно не указана роль'})
      }

    } catch (err) {
      return res.status(500).json({message: 'Что-то пошло не так'})
    }
  });

router.post('/registr',
  [
    check('numberTest', 'Неверный номер зачетной книжки').isLength({min: 5, max: 10}),
    check('email', 'Неверный email').isEmail()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некоректные данные при регистрации"
        })
      }
      const {numberTest, email} = req.body;

      const candidate: IStudent | null = await Student.findOne({ numberTest })

      if (!candidate) {
        return res.status(400).json({message: 'Неверный номер зачетной книжки'})
      }

      if(candidate.account) {
        return res.status(400).json({message: 'У вас уже есть аккаунт'})
      }

      const acc = new Account ({
        login: uuidv1().split('-')[0],
        password: uuidv4().split('-')[0],
        role: 'student'
      })

      const newAcc = await acc.save()

      await Student.updateOne({_id: candidate._id}, {
        "account._id": newAcc._id,
        "account.login": newAcc.login
      })

      try {
        sendMail(email, acc)
        return res.status(200).json({message: 'Сообщение отправленно на почту'})
      } catch(err) {
        return res.status(400).json({message: err})
      }

    } catch (err) {
      return res.status(500).json({message: err})
    }
  });

function sendMail(email, acc) {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'john.smith.my.acc@gmail.com',
        pass: 'kcpuxonlpitfovgj',
      },
    })

    transporter.sendMail({
      from: 'john.smith.my.acc@gmail.com',
      to: email,
      subject: 'Запись на семинар',
      text: 'Вы успешно записались на семинар.',
      html:
        `<h1>Регистрация на <b>my-university-home</b></h1>
        <p>Ваш логин: <b>${acc.login}</b></p>
        <p>Ваш пароль: <b>${acc.password}</b></p>`,
    }, function (err, data) {
      if (err) {
        throw new Error("При отправке email произошла ошибка")
      } else {
        return true
      }
    });
  } catch(err) {
    throw new Error("При отправке email произошла ошибка")
  }
}

module.exports = router