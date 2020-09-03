const Mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();

const app = express();
const { DB_URL } = process.env;

Mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true }).then(res => {
    console.log('Database connected successfully');
}).catch(err => {
    console.log(err);
});

app.listen(8000, () => {
    console.log('server started at port');
});