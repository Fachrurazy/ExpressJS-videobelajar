const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const Product = db.define('produk_kelas', {
    KelasID: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    NamaKelas: { type: DataTypes.STRING, allowNull: false },
    Deskripsi: { type: DataTypes.TEXT, allowNull: false },
    Harga: { type: DataTypes.DECIMAL, allowNull: false },
    KategoriID: { type: DataTypes.INTEGER, allowNull: true },
    created_At: { type: DataTypes.DATE, allowNull: true},
    updated_At: { type: DataTypes.DATE, allowNull: true},
    deleted_At: { type: DataTypes.DATE },
}, {
    timestamps: false,
    tableName: 'produk_kelas'
})

module.exports = Product;