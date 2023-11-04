// Load env variables
if(process.env.NODE_ENV != 'production') {
    require('dotenv').config();
 }
const mongoose = require('mongoose');

async function connect() {
    // console.log('hello');
    try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Connected To database');
} catch (err) {
    console.log(err);
}
}


module.exports = connect;