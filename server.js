require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const db = require('./db/database');

require('./auth');
const userRouter = require('./routes/user-router');
const employee = require('./routes/employee-route');
const admin = require('./routes/admin-route');

const passport = require('passport');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'Mongodb connection error:'));


//Checking role
async function adminAuth(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(401).json({
            message: 'Unauthorized, not a admin'
        });
    }
}

app.use('/all', userRouter);
//adding authentication with passport
app.use('/employee', passport.authenticate('jwt', { session: false }), employee);
app.use('/admin', passport.authenticate('jwt', { session: false }), adminAuth, admin);


app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err });
});

app.get('/', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    res.send('cors problem fixed:)');
});

/*
app.use(express.static(path.join(__dirname, "client", "build" )));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
}); 

if (process.env.NODE_ENV === 'production') {
    //*Set static folder up in production
    app.use(express.static('client/build'));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
  }*/

app.listen(port, () => console.log(`Server is up and running on port ${port}`));

