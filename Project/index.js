require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

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

if (process.env && process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
    app.use(cors({ credentials: true, origin: process.env.FRONTENDHOST }));
  } else {
    app.use(cors());
  }

mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://idabakken_school:school@schoolwork.nzdyv.mongodb.net/webproject?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to DB!'))
  .catch(error => console.log(error));

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


app.listen(port, () => console.log(`Server is up and running on port ${port}`));