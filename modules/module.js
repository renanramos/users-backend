const mysql = require('mysql')
const db = require('./../database/db-config')

const _getConnection = () => {
    return mysql.createConnection(db.config);
}

const _getAllUsers = (callback) => {
    let conn = _getConnection();
    conn.query('SELECT * FROM user', (error, results, fields) => {
        callback(results);
    })
    conn.end()
}

const _createNewUser = (user, callback) => {
    let conn = _getConnection();
    conn.query(`INSERT INTO \`my-db\`.\`user\` SET
            user.user_name = ?,
            user.user_lastname = ?,
            user.user_age = ? `, [user.name, user.lastname, user.age],
        (error, results, fields) => {
            if (error) throw callback(error);
            let response = {
                status: 200,
                message: 'Usuário incluído com sucesso'
            }
            callback(response)
        });
    conn.end();
}


module.exports = {
    getAllUsers: _getAllUsers,
    createUser: _createNewUser,
}
