// const database = require('../config/database')
// const User = require('../models/userModel')
// const bycrypt = require('bcrypt')
// const saltRounds = 10
// const crypto = require('crypto')

// exports.getUsers = async (req, res) => {
//     try {
//         const result = await User.getAllUsers();
        
//         if (!result) {
//             return res.status(404).json({ 
//                 code:404,
//                 message: 'Users not found',
//                 data: null});
//         }
        
//         return res.status(200).json({
//             code:200,
//             message: "Success get all users",
//             data: result
//         });
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({ 
//             code:500, 
//             servermessage: err, 
//         });
//     }
// };

// exports.getUserById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const result = await User.getUserById(id);

//         if (!result) {
//             return res.status(404).json({ 
//                 code:404,
//                 message: 'User not found',
//                 data: null});
//         }

//         return res.status(200).json({
//             code:200,
//             message: "Success get user by id",
//             data: result
//         })
//     } catch (err) {
//         res.status(500).json({ 
//             code:500,
//             servermessage: err 
//         });
//     }
// };

// exports.createUser = async (req, res) => {
//     try {

//         if (!req.body.fullname || !req.body.gender || !req.body.email || !req.body.password || !req.body.role) {
//             return res.status(400).json({ 
//                 code:400,
//                 message: 'Bad request, all fields are required',
//                 data: null});
//         }
//         const { fullname, gender, email, password, role } = req.body;
//         const hashedPassword = await bycrypt.hash(password, saltRounds);
//         const token = crypto.randomUUID;
//         const result = await User.addUser(fullname, gender, email, hashedPassword, role, token);
//         return res.status(201).json({
//             code:201,
//             message: "Success create user"
//         });
//     } catch (err) {
//         res.status(500).json({ 
//             code:500,
//             servermessage: err 
//         });
//     }
// };

// exports.updateUser = async (req, res) => {
//     try {
//         if (!req.body.fullname || !req.body.gender || !req.body.email || !req.body.password || !req.body.role) {
//             return res.status(400).json({ 
//                 code:400,
//                 message: 'Bad request, all fields are required',
//                 data: null});
//         }
//         const { id } = req.params;
//         const { fullname, gender, email, password, role } = req.body;
//         const hashedPassword = await bycrypt.hash(password, saltRounds);
//         const result = await User.updateUser(id, fullname, gender, email, hashedPassword, role);
//         return res.status(200).json({
//             code:200,
//             message: "Success update user"
//         });
//     } catch (err) {
//         res.status(500).json({ 
//             code:500,
//             servermessage: err 
//         });
//     }
// };

// exports.deleteUser = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const result = await User.deleteUser(id);
//         return res.status(200).json({
//             code:200,
//             message: "Success delete user"
//         });
//     } catch (err) {
//         res.status(500).json({ 
//             code:500,
//             servermessage: err 
//         });
//     }
// };
const User = require('../models/User')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const UserController = {
    async createUser(req, res){
        try {
            const { fullname, gender, email, password, role } = req.body
            if(!fullname || !gender || !email || !password || !role){
                return res.status(400).json({
                    code:400,
                    message: 'Bad request, all fields are required',
                    data: null
                })
            }
            const hashedPassword = bcrypt.hash(password, 10)
            const token = crypto.randomUUID()
            const result = await User.create(
                fullname, 
                gender, 
                email, 
                password = hashedPassword, 
                role, 
                token,
                status = "PENDING")
            return res.status(201).json({
                code:201,
                message: "Success create user"
            })
        }
        catch (err) {
            res.status(500).json({ 
                code:500,
                servermessage: err 
            });
        }
    }
}

module.exports = UserController