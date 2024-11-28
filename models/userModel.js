const connection = require('../config/database');

const User = {
    getAllUsers: async () => {
        const sqlQuery = 'SELECT * FROM users';
        const [result] = await connection.query(sqlQuery);
        return result;
    }
};

module.exports = User;
