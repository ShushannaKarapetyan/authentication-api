require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        })
    } catch (error) {
        console.log(error)
    }
};

start();