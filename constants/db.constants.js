const db_config = require('./../database/db-config');

const schema = db_config.config.database;
const userTable = 'user';
const userId = 'user_id';
const userName = 'user_name';
const userLastName = 'user_lastname';
const userAge = 'user_age';

const _getAllUsers = `SELECT * FROM ${schema}.${userTable}`;

const _getUserById = `SELECT * FROM ${schema}.${userTable} WHERE ${userTable}.${userId} = ?`;

const _createUser = `
INSERT INTO ${schema}.${userTable} SET 
    ${userTable}.${userName} = ?,    
    ${userTable}.${userLastName} = ?,
    ${userTable}.${userAge} = ? `;

const _updateUser = `
    UPDATE  ${schema}.${userTable} SET
    ${userTable}.${userName} = ?,
    ${userTable}.${userLastName} = ?,
    ${userTable}.${userAge} = ?
    WHERE ${userTable}.${userId} = ?`;

const _deleteUser = `DELETE FROM ${schema}.${userTable} WHERE ${userTable}.${userId} = ? `;

module.exports = {
    getAllUsers: _getAllUsers,
    getUserById: _getUserById,
    createUser: _createUser,
    updateUser: _updateUser,
    deleteUser: _deleteUser
}