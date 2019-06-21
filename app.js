const mod = require('./modules/module')
const bodyParse = require('body-parser')
const express = require('express')
const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: true }))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.setHeader("Content-Type", "application/json");
    next();
})

app.get('/', (req, res) => res.send('App NodeJS MySQL'))

app.get('/api/users', (req, res) => {
    mod.getAllUsers((data) => {
        if (data == undefined) {
            res.json(data)
            res.status(200)
        } else {
            res.json(data)
            res.status(200)
        }
    })
})

app.get('/api/users/:userId', (req, res) => {    
    let id = req.params.userId
    let response = {}    
    if(id !== null && id !== undefined){
        mod.getUserById(id, (data) => {
            if(Object.entries(data).length > 0){
                res.json(data)
                res.status(200)
            }else{
                response.status = 404
                response.message = 'Usuário não encontrado ou não existe.'
                res.json(response)
                res.status(404)
            }
        })
    }else{
        response.status = 404
        response.message = 'Usuário não encontrado ou não existe.'
        res.json(JSON.stringify(response))
        res.status(404)
    }
})

app.post('/api/users', (req, res) => {
    let user = { name, lastname, age } = req.body
    let response = {}

    if (req.body === null || req.body === undefined) {
        response = {
            status: 400,
            message: "Erro na requisição. Dados não informados"
        }
        res.json(JSON.stringify(response));
        res.status(400);
    } else {
        mod.createUser(user, (response) =>{            
            res.json(JSON.stringify(response));
            res.status(200);
        })
    }
})

app.put('/api/users', (req, res) => {    
    let user = req.body
    if (Object.entries(user).length == 0) {
        // TODO tratar retorno de erro
    } else {
        mod.updateUser(user, (response) => {
            res.json(JSON.stringify(response))
            res.status(200)
        })
    }
})

app.delete('/api/users/:id', (req, res) => {
    let id = req.params.id
    if(id > 0){
        mod.deleteUser(id, (response) => {
            res.json(JSON.stringify(response))
            res.status(200)
        })
    }else{
        let response = {
            status: 404,
            message: 'Usuário não existe ou não foi encontrado'
        }
        res.json(JSON.stringify(response))
        res.status(404)
    }
})

app.listen(port, () => console.log(`Server running on port ${port}`))