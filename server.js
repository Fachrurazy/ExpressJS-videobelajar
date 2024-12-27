// const express = require('express')
// const bodyParser = require('body-parser')
// const dotenv = require('dotenv')
// const userRoutes = require('./routes/userRoute')

// dotenv.config()

// const app = express()

// app.use(bodyParser.json())
// app.use(userRoutes)

// const PORT = process.env.PORT || 3000

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`)
// })


const express = require('express');
const db = require('./config/database');
const userRoutes = require('./routes/userRoute');
const productRoutes = require('./routes/productRoute');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/products', productRoutes);

(async () => {
    try {
        await db.authenticate();
        console.log('Database connected.');
        // await db.sync() untuk sync table membuat table jika tidak ada di database
    } catch (error) {
        console.error('Database error:', error);
    }
})();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port'+ PORT));