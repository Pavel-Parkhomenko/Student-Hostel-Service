const express = require('express');
const mongoose = require('mongoose');
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

const bp = require('body-parser')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use('/auth', require('./routers/auth.route'))
app.use('/student', require('./routers/student.route'))

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