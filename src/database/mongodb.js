const mongoose = require('mongoose');

module.exports = () => {
    return mongoose.connect(process.env.CONNECTION_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}
