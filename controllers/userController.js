const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const User = require('../models/userModel');
const EmailService = require('../service/authServices');
const generateActivationEmail = require('../template/activationUser');
require('dotenv').config();

const UserController = {
    async createUser(req, res) {
        try {
            const { fullname, gender, email, password, role } = req.body;

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Generate token
            const token = crypto.randomBytes(32).toString('hex');

            // Create user
            const newUser = await User.create({ fullname, gender, email, password: hashedPassword, role, token });

            // Link activation email
            const activationLink = process.env.LOCALHOST_URL + '/api/users/activate/' + token;

            // Html body email
            const htmlBody = generateActivationEmail(activationLink, fullname);

            const emailSent = await EmailService.sendEmail(
                email,
                'Activate Your Account',
                htmlBody
            );

            if (!emailSent) {
                return res.status(500).json({ message: 'Failed to send activation email.' });
            }

            res.status(201).json({ message: 'User created successfully', data: newUser });
        } catch (error) {
            res.status(500).json({ message: 'Error creating user', error: error.message, errorCode: error.code });
        }
    },

    async loginUser(req, res) {
        try {
            const { email, password } = req.body;

            // validation check email
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            // validation if user status is PENDING
            if (user.status === 'PENDING') {
                return res.status(403).json({ message: 'Account not activated. Please activate your account first.' });
            }

            // validation check password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            // Generate JWT token
            const token = jwt.sign(
                { userID: user.usersID, role: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '30s' }
            );

            res.status(200).json({ message: 'Login successfully', token });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ message: 'Login failed', error: error.message });
        }
    },

    async activateUser(req, res) {
        try {
            const { token } = req.query;

            // Check if token exists di database
            const user = await User.findOne({ where: { token } });
            if (!user) {
                return res.status(403).json({ message: 'Invalid or expired activation token' });
            }

            // Update user's status menjadi 'ACTIVE' dan set token menjadi null
            await User.update(
                { status: 'ACTIVE', token: null },
                { where: { usersID: user.usersID } }
            );

            res.status(200).json({ message: 'Account activated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to activate account', error: error.message });
        }
    },

    async uploadProfile(req, res) {
        try {
            // Memastikan file ada
            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' }); // Mengembalikan error jika tidak ada file
            }
    
            // Mendapatkan nama file yang di-upload tanpa jalur direktori
            const profileFileName = req.file.filename; // Mengambil nama file saja
    
            // Mengupdate kolom profile di database untuk user yang sedang login
            await User.update(
                { profile: profileFileName }, // Mengupdate kolom profile dengan nama file
                { where: { usersID: req.user.userID } } // Menentukan user yang diupdate berdasarkan userID
            );
    
            // Mengembalikan respon sukses
            res.status(200).json({
                message: 'Profile uploaded successfully', // Pesan sukses
            });
        } catch (error) {
            console.error(error); // Menampilkan error di console
            res.status(500).json({ message: 'Failed to upload profile', error: error.message }); // Mengembalikan error
        }
    },

    async getUsers(req, res) {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users', error: error.message });
        }
    },

    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) return res.status(404).json({ message: 'User not found' });

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user', error: error.message });
        }
    },

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { fullname, gender, email, role, status } = req.body;

            const user = await User.findByPk(id);
            if (!user) return res.status(404).json({ message: 'User not found' });

            await user.update({ fullname, gender, email, role, status, updated_At: new Date() });

            res.status(200).json({ message: 'User updated successfully', data: user });
        } catch (error) {
            res.status(500).json({ message: 'Error updating user', error: error.message });
        }
    },

    async deleteUser(req, res) {
        try {
            const { id } = req.params;

            const user = await User.findByPk(id);
            if (!user) return res.status(404).json({ message: 'User not found' });

            await user.destroy();

            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user', error: error.message });
        }
    },
}

module.exports = UserController;
