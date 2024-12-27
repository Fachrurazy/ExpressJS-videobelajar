const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const User = db.define('Users', {
    usersID: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    fullname: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING },
    token: { type: DataTypes.TEXT },
    status: { type: DataTypes.STRING, defaultValue: 'PENDING' },
    profile: { type: DataTypes.STRING, allowNull: false},
    created_At: { type: DataTypes.DATE, allowNull: true},
    updated_At: { type: DataTypes.DATE, allowNull: true},
    deleted_At: { type: DataTypes.DATE },
}, {
    timestamps: false,
    tableName: 'users'
})

module.exports = User;