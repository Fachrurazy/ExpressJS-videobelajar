const jwt = require('jsonwebtoken');

const AuthMiddleware = {
    async authenticateToken(req, res, next) {
        try {
            const authHeader = req.headers['authorization'];
            if (!authHeader) {
                return res.status(401).json({ message: 'Authorization header not found' });
            }
            const token = authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Token not found' });
            }

            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    return res.status(403).json({ message: 'Invalid or expired token' });
                }
        
                req.user = user; // Menyimpan informasi pengguna di objek `req` untuk middleware berikutnya
                next(); // Melanjutkan ke middleware berikutnya
            });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

module.exports = AuthMiddleware;