const mod = require('./modules/module')
const bodyParse = require('body-parser')
const express = require('express')
const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: true }))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
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
    let conn = mod.getConnection()
    let userId = req.params.userId
    conn.query(`SELECT * FROM user WHERE user.user_id = ${userId}`, (error, results, fields) => {
        if (error) throw error
        res.send(results)
    })
    conn.end()
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

app.put('/api/user/:userId', (req, res) => {
    let { name, lastname, age } = req.body
    if (userId === null || userId === undefined) {
        // TODO tratar retorno de erro
    } else {
        let conn = mod.getConnection();
        conn.query(`
            UPDATE  \`my-db\`.\`user\` SET
            user.user_name = ?,
            user_user_lastname = ?,
            user_user_age = ?
            WHERE user.user_id = ?
        `, [name, lastname, age, userId], function (error, results, fields) {

            });
        conn.end()
    }

})

app.listen(port, () => console.log(`Server running on port ${port}`))