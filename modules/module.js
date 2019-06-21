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

const _getUserByID = (userId, callback) => {
    let conn = _getConnection();
    conn.query('SELECT * FROM user WHERE user.user_id = ?', [userId], (error, results, fields) => {
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

const _updateUser = (user, callback) => {    
    if(Object.entries(user).length > 0){
        let conn = _getConnection();
        let response = {}
        conn.query(`
            UPDATE  \`my-db\`.\`user\` SET
            user.user_name = ?,
            user.user_lastname = ?,
            user.user_age = ?
            WHERE user.user_id = ?`,
            [user.name, user.lastname, user.age, user.id],
            (error, results, fields) => {
                if(results.affectedRows == 1){
                    response = {
                        status: 200,
                        message : 'Usuário editado com sucesso'
                    }
                }else{
                    response = {
                        status: 400,
                        message : 'Houve algum problema'
                    }
                }
                callback(response)
            })
        conn.end()
    }
}

const _deleteUser = (id, callback) =>{
    let conn = _getConnection();
    let response = {}
    conn.query(`DELETE FROM \`my-db\`.\`user\` WHERE user.user_id = ?`, id, (error, results, fields) => {
        if(error)throw error;
        if(results.affectedRows == 1){
            response = {
                status: 200,
                message: 'Usuário excluído com sucesso'
            }
        }else{
            response = {
                status: 500,
                message: 'Something went worng'
            }
        }
        callback(response)
    })
    conn.end()
}

module.exports = {
    getAllUsers: _getAllUsers,
    getUserById: _getUserByID,
    updateUser: _updateUser,
    createUser: _createNewUser,
    deleteUser: _deleteUser
}
