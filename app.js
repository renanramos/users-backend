const mod = require('./modules/module')
const bodyParse = require('body-parser')
const express = require('express')
const app = express();

const port = process.env.PORT || 3333;

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
    let conn = mod.getConnection()
    conn.query('SELECT * FROM user', (error, results, fields) => {
        res.send(results)
    })
    conn.end()
})

app.get('/api/users/:id', (req, res) => {
    let conn = mod.getConnection()
    let userId = req.params.id
    conn.query(`SELECT * FROM user WHERE usesr.user_id = ${userId}`, (error, results, fields) => {
        if (error) throw error
        res.send(results)
    })
    conn.end()
})

app.post('/api/users', (req, res) => {
    let conn = mod.getConnection();
    let { name, lastname, age } = req.body
    let response = {}
    conn.query(
        `INSERT INTO \`my-db\`.\`user\` SET 
         user.user_name = ?,
         user.user_lastname = ?, 
         user.user_age = ? `, [name, lastname, age], function (error, results, fields) {
            if (error) throw error;
            response = {
                status: 200,
                message: 'Usuário incluído com sucesso'
            }
            res.json(JSON.stringify(response));
            res.status(200);
        });
    conn.end();    
})

app.listen(port, () => console.log(`Server running on port ${port}`))