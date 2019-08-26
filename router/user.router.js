const mod = require('../modules/module');
const express = require('express')
const routes = express.Router();

routes.get('/users', (req, res) => {
    mod.getAllUsers((data) => {
        if (!data) console.log('Error')
        res.status(200).json(data);
    })
});

routes.get('/users/:userId', (req, res) => {
    let id = req.params.userId;

    if (!id) console.log('Error');

    mod.getUserById(id, (data) => {
        if (!data) console.log('Error');
        res.status(200).json(data);
    });
});

routes.post('/users', (req, res) => {
    let user = { name, lastname, age } = req.body;
    
    if (!req.body) console.log('Error');

    mod.createUser(user, (response) => {
        res.status(204).json(response);
    });
});

routes.patch('/users', (req, res) => {
    let user = req.body;
    if (!req.body) console.log('Error');

    mod.updateUser(user, (response) => {
        res.status(204).json(response);
    });
});

routes.delete('/users/:userId', (req, res) => {
    let id = req.params.userId;
    if (id <= 0) console.log('Error');
    mod.deleteUser(userId, (reqonse) => {
        res.status(200).json(response);
    });
});

module.exports = routes;