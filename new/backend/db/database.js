const mongoose = require('mongoose');

//connecting to database using mongoose connect
mongoose
    .connect('mongodb+srv://idabakken_school:school@schoolwork.nzdyv.mongodb.net/webproject?retryWrites=true&w=majority', 
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => console.log('Connected to DB!'))
    .catch(e => {
        console.error('Connection error', e.message);
    });

const db = mongoose.connection;

module.exports = db;