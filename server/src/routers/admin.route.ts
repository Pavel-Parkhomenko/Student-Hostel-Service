import { Router } from 'express'
import { Mentor } from '../models/mentor'
import { Account } from '../models/account'

const router = Router()

router.get('/get-employee', async (req, res) => {
  try {
    const employee = await Mentor.find()
    return res.status(200).json({data: employee, message: 'Данные получены'})
  } catch (err) {
    return res.status(500).json({message: 'Что-то пошло не так'})
  }
});

router.post('/create-employee', async (req, res) => {
  try {
    const { secondName, firstName, middleName,
      impactFrom, impactTo, login, password ,
    } = req.body

    const previewAcc = await Account.findOne({login: login})
    if(previewAcc) {
      return res.status(400).json({message: 'Такой логин уже существует'})
    }

    const mentor = new Mentor({
      secondName, firstName, middleName,
      role: 'mentor',
      impact: {
        from: Number(impactFrom),
        to: Number(impactTo),
      },
      account: { login }
    })
    const acc = new Account({ login, password, role: 'mentor' })
    await mentor.save()
    await acc.save()
    return res.status(200).json({message: 'Сотрудник создан'})
  } catch (err) {
    return res.status(500).json({message: 'Что-то пошло не так'})
  }
});

module.exports = router