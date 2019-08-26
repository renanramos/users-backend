const mod = require('./modules/module');
const bodyParse = require('body-parser');
const express = require('express');
const app = express();
const userController = require('./controller/user.controller');

app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.setHeader("Content-Type", "application/json");
    next();
})

app.use('/', (req, res) => {
    res.status(200).json('Server is running!');
});
app.use('/api', userController);

module.exports = app;