const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/database')

const User = db.define('User', {
    fullname: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    token: { type: DataTypes.STRING},
}, {
    timestamps: true,
});