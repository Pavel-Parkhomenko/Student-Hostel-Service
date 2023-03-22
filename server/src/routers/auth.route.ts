const { Router } = require('express');
const Account = require('../models/account');
const { check, validationResult } = require('express-validator')

const router = Router();

router.post('/login',
    [check('login', 'Неверный логин').isLength({ min: 5, max: 15 }),
        check('password', 'Неверный пароль').isLength({ min: 5, max: 15 }),],
    async (req, res) => {
        try {
            console.log(req.body)
            let errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некоректные данные при входе"
                })
            }

            const { login, password } = req.body;
            const user = await Account.findOne({ login: login });
            if (!user) {
                return res.status(400).json({ message: 'Такого логина не существует' })
            }

            if (password !== user.password)
                return res.status(400).json({ message: 'Пользователя с таким паролем не существует' })

            return res.status(200).json({ login: login, password: password, message: 'Вход выполнен успешно' })

        }
        catch (err) {
            return res.status(500).json({ message: 'Что-то пошло не так' })
        }
    });

// router.post('/registr',
//     [check('fio', 'Неверное имя').isLength({ min: 1, max: 15 }),
//         check('login', 'Неверный логин').isLength({ min: 5, max: 15 }),
//         check('phone', 'Неверный телефон').isLength({ min: 5, max: 15 }),
//         check('password', 'Неверный пароль').isLength({ min: 5, max: 15 }),
//         check('email', 'Неверный email').isEmail()],
//     async (req, res) => {
//         try {
//             const errors = validationResult(req);
//             if (!errors.isEmpty()) {
//                 return res.status(400).json({
//                     errors: errors.array(),
//                     message: "Некоректные данные при регистрации"
//                 })
//             }
//
//             const { fio, login, phone, password, email } = req.body;
//
//             const candidate = await User.findOne({ login: login })
//             if (candidate) {
//                 return res.status(400).json({ message: 'Такой пользователь уже существует' })
//             }
//
//             const user = new User({
//                 fio: fio,
//                 login: login,
//                 phone: phone,
//                 password: password,
//                 email: email
//             })
//
//             await user.save(function (err) {
//                 if (err)
//                     return res.status(400).json({ message: 'Не удалось зарегистровать нового пользователя (err save)' })
//             })
//
//             return res.status(200).json({ message: 'Регистрация прошла успешно' })
//
//         }
//         catch (err) {
//             return res.status(500).json({ message: 'Что-то пошло не так' })
//         }
//     });

module.exports = router