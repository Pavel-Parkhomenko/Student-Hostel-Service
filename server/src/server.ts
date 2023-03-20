const express = require('express');
const mongoose = require('mongoose');
const app = express();
import {
    PORT, NAME_DB
} from './constants'

const bp = require('body-parser')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

// app.use('/auth', require('./routers/auth-rout'))

async function start() {
    try {
        await mongoose.connect(`mongodb://localhost:27017/${NAME_DB}`);
        app.listen(PORT, () => console.log(`Server has been started on port ${PORT}!`));
    }
    catch (e) {
        console.log(`Server Error: ${e.message}`);
        process.exit(1);
    }
}

start();
module.exports = app