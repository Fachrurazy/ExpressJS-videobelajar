const connection = require('../config/database');

const User = {
    getAllUsers: async () => {
        const sqlQuery = 'SELECT * FROM users';
        const [result] = await connection.query(sqlQuery);
        return result;
    },
    getUserById: async (id) => {
        const sqlQuery = 'SELECT * FROM users WHERE usersID = ?';
        const [result] = await connection.query(sqlQuery, [id]);
        return result[0];
    },
    addUser: async (fullname, gender, email, password, role, token) => {
        const sqlQuery = 'INSERT INTO users (fullname, gender, email, password, role, token) VALUES (?, ?, ?, ?, ?, ?)';
        const result = await connection.query(sqlQuery, [fullname, gender, email, password, role, token]);
        return result;
    },
    updateUser: async (id, fullname, gender, email, password, role) => {
        const sqlQuery = 'UPDATE users SET fullname = ?, gender = ?, email = ?, password = ?, role = ? WHERE usersID = ?';
        const result = await connection.query(sqlQuery, [fullname, gender, email, password, role, id]);
        return result;
    },
    deleteUser: async (id) => {
        const sqlQuery = 'DELETE FROM users WHERE usersID = ?';
        const result = await connection.query(sqlQuery, [id]);
        return result;
    }
}

module.exports = User;
