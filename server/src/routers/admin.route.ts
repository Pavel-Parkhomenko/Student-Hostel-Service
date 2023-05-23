import { Router } from 'express'
import { Mentor } from '../models/mentor'
import { Account } from '../models/account'
import { Admin } from '../models/admin'
import { Student } from '../models/student'
import { Hostel } from '../models/hostel'
import {getDateAndTime, getDefaultPlaces} from '../utils'
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
      "firstName middleName secondName numberTest pay dateInHostel")
    let result: Number = 0
    let studentsNew = []
    for(let i = 0; i < students.length; i++) {
      result = students[i].pay.reduce(function(sum, elem) {
        return sum + elem.payment;
      }, 0);
      studentsNew = [...studentsNew, {
        // @ts-ignore
          ...students[i]!._doc,
          sum: result,
        }
      ]
    }
    const hostel = (await Hostel.find())[0]
    return res.status(200).json({ data: { studentsNew, sumHostel: hostel.costsHostel },
      message: 'Студент полученны' })
  } catch (err) {
    return res.status(500).json({ message: 'Что-то пошло не так' })
  }
});

const MONTH = {
  Sep: 0,
  Oct: 1,
  Nov: 2,
  Dec: 3,
  Jan: 4,
  Feb: 5,
  Mar: 6,
  Apr: 7,
  May: 8,
  Jun: 9,
  Jul: 10,
  Aug: 11,
}

router.post('/change-pay-hostel', async (req, res) => {
  try {
    const { cost } = req.body
    const hostel = (await Hostel.find())[0]
    if(!hostel) {
      await Hostel.create({
        costHostel: cost,
        costsHostel: [cost, 0,0,0,0,0,0,0,0,0,0,0],
      })
    } else {
      const costsHostel = hostel.costsHostel
      const monthCur = new Date().toLocaleString('eng', { month: 'short' })

      for(let i = 0; i <= Object.keys(MONTH).length; i++) {
        if(i <= MONTH[monthCur]) {
          if(costsHostel[i] === 0) costsHostel[i] = cost
          if(i === MONTH[monthCur]) costsHostel[i] = cost
        } else {
          costsHostel[i] = 0
        }
      }
      hostel.costsHostel = costsHostel
      hostel.costHostel = cost
      await hostel.save()
    }
    return res.status(200).json({ data: cost, message: 'Данные обновленны' })
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ message: 'Что-то пошло не так' })
  }
});

router.get('/change-places', async (req, res) => {
  try {
    const places = getDefaultPlaces()
    const hostelBd = (await Hostel.find())[0]
    hostelBd.places = places
    await hostelBd.save()
    return res.status(200).json({ data: '', message: 'Данные обновленны' })
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ message: 'Что-то пошло не так' })
  }
});

router.get('/get-free-places', async (req, res) => {
  try {
    const hostelBd = (await Hostel.find())[0]
    const places = hostelBd.places
    const freePlaces = []
    let floor = 0
    for (let i = 0; i < places.length; i++) {
      if(places[i] === 'Занято') continue
      floor = Number(places[i].split('-')[0])
      if (!freePlaces[floor]) {
        if(places[i] === places[i + 1]) {
          freePlaces[floor] = [places[i] + '/2']
          i = i + 1
        } else freePlaces[floor] = [places[i]]
      } else if(places[i] === places[i + 1]) {
        freePlaces[floor] = [...freePlaces[floor], places[i] + "/2"]
        i = i + 1
      } else {
        freePlaces[floor] = [...freePlaces[floor], places[i]]
      }
    }
    return res.status(200).json({ data: freePlaces, message: 'Данные полученны' })
  } catch (err) {
    console.log(err.message)
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

router.get('/report-pays', async (req, res) => {
  try {
    const dirname = __dirname.split("\\").slice(0,3).join('\\')
    const filename = `pays-${getDateAndTime().split(' ')[0]}.xlsx`
    const students = await Student.find({
      formEducation: 'платное'
    }, 'firstName middleName secondName pay')
    const hostel = (await Hostel.find())[0]
    const costHostel = hostel.costsHostel.reduce(function(sum, elem) {
      return sum + elem;
    }, 0);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    // Заголовки столбцов
    const headersRus = ['Имя', 'Отчество', 'Фамилия', 'Сумма', 'Остаток по оплате', 'Статус']
    worksheet.addRow(headersRus);

    function changeRow(row, type) { //green FF00FF00 //red FFFF0000
      row._cells.at(-1).font = {
        color: type === 'Задолженности нет' ?  { argb: 'FF00FF00' } : { argb: 'FFFF0000' }
      };
    }

    let result = 0
    let status = ''
    for(let i = 0; i < students.length; i++) {
      result = 0
      status = ''
      if(students[i].pay.length === 0) {
        status = costHostel > result ? 'Задолженность' : 'Задолженности нет'
        let row = worksheet.addRow(
          [students[i].firstName, students[i].middleName, students[i].secondName, result, costHostel-result, status]);
        changeRow(row, status)
      } else {
        result = students[i].pay.reduce(function(sum, elem) {
          return sum + elem.payment;
        }, 0);
        status = costHostel > result ? 'Задолженность' : 'Задолженности нет'
        let row = worksheet.addRow(
          [students[i].firstName, students[i].middleName, students[i].secondName, result, costHostel-result, status]);
        changeRow(row, status)
      }
    }

    // Сохранение файла
    await workbook.xlsx.writeFile('reports/' + filename);
    const filePath = path.join(dirname, 'reports', `${filename}`);
    res.sendFile(filePath);
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({message: 'Что-то пошло не так'})
  }
});

module.exports = router