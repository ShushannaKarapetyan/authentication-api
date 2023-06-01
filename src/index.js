require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./database/mongodb');
const {AuthMiddleware} = require('./middlewares');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const options = require('./api-doc/options');
const PORT = process.env.PORT || 3001;

app.use(express.json());

const {
    authRouter,
    profileRouter,
    otpRouter,
} = require('./routes');

app.use('/auth', authRouter);
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(options)));

app.use(AuthMiddleware.authorize);
app.use('/me', profileRouter);
app.use('/auth/otp', otpRouter);

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
