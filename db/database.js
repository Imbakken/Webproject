const mongoose = require('mongoose');
require('dotenv').config();

//connecting to database using mongoose connect
mongoose.connect( process.env.MONGO_URI || 'mongodb+srv://idabakken_school:school@schoolwork.nzdyv.mongodb.net/webproject?retryWrites=true&w=majority', 
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(e => {
        console.error('Connection error', e.message);
    });

const db = mongoose.connection;

module.exports = db;