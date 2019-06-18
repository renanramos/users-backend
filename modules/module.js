const mysql = require('mysql')
const db = require('./../database/db-config')

const _getConnection = () => {
    return mysql.createConnection(db.config);
}

module.exports = {
    getConnection : _getConnection
}
