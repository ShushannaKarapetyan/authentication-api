require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./database/mongodb');
const PORT = process.env.PORT || 3001;

app.use(express.json());

const {authRouter} = require('./routers');

app.use('/auth', authRouter);

connectDB()
    .then(() => {
        console.log('Connected to the db.');

        listenToServer();
    })
    .catch((error) => {
        throw error;
    });

function listenToServer() {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    }).on('error', (error) => {
        if (error) {
            throw error;
        }
    });
}
