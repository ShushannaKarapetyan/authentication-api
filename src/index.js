require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./database/mongodb');
const {AuthMiddleware} = require('./middlewares');
const PORT = process.env.PORT || 3001;

app.use(express.json());

const {
    authRouter,
    profileRouter,
} = require('./routes');

app.use('/auth', authRouter);
app.use(AuthMiddleware.authorize);
app.use('/me', profileRouter);

connectDB()
    .then(() => {
        console.log('Connected to the db.');

        connectServer();
    })
    .catch((error) => {
        throw error;
    });

function connectServer() {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    }).on('error', (error) => {
        if (error) {
            throw error;
        }
    });
}
