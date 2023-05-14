import { Router } from 'express'
import { Mentor } from '../models/mentor'
import { Account } from '../models/account'
import { Admin } from '../models/admin'
import { Student } from '../models/student'
import { getDateAndTime } from '../utils'
import path from "path";

const router = Router()

router.get('/get-admin-info', async (req, res) => {
  try {
    const admin = await Admin.find()[0]
    return res.status(200).json({data: admin, message: 'Данные получены'})
  } catch (err) {
    return res.status(500).json({message: 'Что-то пошло не так'})
  }
});

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

router.get('/delete-student', async (req, res) => {
  try {
    const id = req.query.id
    const admin = await Student.deleteOne({ numberTest: id })
    return res.status(200).json({data: admin, message: 'Студент успешно выселен'})
  } catch (err) {
    return res.status(500).json({message: 'Что-то пошло не так'})
  }
});

router.get('/get-payments', async (req, res) => {
  try {
    const students = await Student.find({ formEducation: 'платное' },
      "firstName middleName secondName numberTest pay")
    return res.status(200).json({ data: students, message: 'Студент полученны' })
  } catch (err) {
    return res.status(500).json({ message: 'Что-то пошло не так' })
  }
});

const ExcelJS = require('exceljs');
router.get('/report-balls', async (req, res) => {
  try {
    const dirname = __dirname.split("\\").slice(0,3).join('\\')
    const filename = `balls-${getDateAndTime().split(' ')[0]}.xlsx`
    const students = await Student.find({}, 'firstName middleName secondName balls')

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    // Заголовки столбцов
    const headersRus = ['Имя', 'Отчество', 'Фамилия', 'Баллы']
    const headers = Object.keys(students[0]['_doc']).slice(1)
    worksheet.addRow(headersRus);

    // Данные
    students.forEach(obj => {
      const row = [];
      headers.forEach(header => {
        row.push(obj[header]);
      });
      worksheet.addRow(row);
    });

    // Сохранение файла
    await workbook.xlsx.writeFile('reports/' + filename);
    const filePath = path.join(dirname, 'reports', `${filename}`);
    res.sendFile(filePath);
  } catch (err) {
    return res.status(500).json({message: 'Что-то пошло не так'})
  }
});

module.exports = router