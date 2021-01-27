const mongoose = require('mongoose');
require('dotenv').config({path: 'vars.env'});
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: true
        });
        console.log('Mongoose DB Connected')
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
};
module.exports = connectDB;