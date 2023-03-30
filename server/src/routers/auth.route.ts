const {Router} = require('express');
const Account = require('../models/account');
const {check, validationResult} = require('express-validator')
const Student = require('../models/student')
import {IAccount, IStudent} from '../interfaces'
const nodemailer = require('nodemailer')
const {
  v1: uuidv1,
  v4: uuidv4
} = require('uuid');

const router = Router();

router.post('/login',
  [check('login', 'Неверный логин').isLength({min: 5, max: 15}),
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

      return res.status(200).json({login: login, message: 'Вход выполнен успешно'})

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
        password: uuidv4().split('-')[0]
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


      return res.status(200).json({message: 'Аккаунт создан'})

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
        <p>Ваш логин: <b>{acc.login}</b></p>
        <p>Ваш пароль: <b>{acc.password}</b></p>`,
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

// router.post('/sendmail',
//   async (req, res) => {
//     try {
//       const { fio, email, seminar } = req.body;
//       console.log("sendmail")
//
//       let testEmailAccount = await nodemailer.createTestAccount()
//
//       let transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: 'john.smith.my.acc@gmail.com',
//           pass: 'kcpuxonlpitfovgj',
//         },
//       })
//
//       transporter.sendMail({
//         from: 'john.smith.my.acc@gmail.com',
//         to: email,
//         subject: 'Запись на семинар',
//         text: 'Вы успешно записались на семинар.',
//         html:
//           `<h2>Уважаемый <b>${fio}</b>, семинар <i>${seminar}</i> начнется 01.05.2023 в 19:00</h2>`,
//       }, function (err, data) {
//         if (err) {
//           res.status(400).json({ message: "failed" })
//         } else {
//           res.status(201).json({ message: "success" })
//         }
//       });
//
//     } catch (err) { console.log(err) }
//   })


module.exports = router