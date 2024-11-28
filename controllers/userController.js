const User = require('../models/userModel');

exports.getUsers = async (req, res) => {
    try {
        const result = await User.getAllUsers();
        
        return res.status(200).json({
            code:200,
            message: "Success get all users",
            data: result
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ 
            code:500,
            servermessage: err, 
        });
    }
};

