const express = require('express');
const mongoose = require('mongoose');
const bp = require('body-parser')
const multer = require('multer');
import cors from 'cors'

const app = express();
import {
    PORT, NAME_DB
} from './constants'

app.use(cors())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
})


app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(express.static(__dirname));

app.use('/auth', require('./routers/auth.route'))
app.use('/student', require('./routers/student.route'))
app.use('/mentor', require('./routers/mentor.route'))
app.use('/news', require('./routers/news.route'))
app.use('/event', require('./routers/event.route'))
app.use('/chat', require('./routers/chat.route'))
app.use('/common', require('./routers/common.route'))
app.use('/admin', require('./routers/admin.route'))
app.use('/repair', require('./routers/repair.route'))

async function start() {
    try {
        await mongoose.connect(`mongodb://127.0.0.1:27017/diplom_db`);
        app.listen(PORT, () => console.log(`Server has been started on port ${PORT}!`));
    }
    catch (e) {
        console.log(`Server Error: ${e.message}`);
        process.exit(1);
    }
}

start();
module.exports = app