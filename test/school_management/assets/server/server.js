const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const morgan = require('morgan');
const app = express();
dotenv.config({path: 'config.env'});

const PORT = process.env.PORT || 80

//logging requests

app.use(morgan('tiny'));
app.get('/', (req,res)=>{
      res.send("app does work");
})

app.listen(3000, ()=> {(console.log(`Server is running on http://localhost:${3000}`))});


// getting requests from database

// servertimestamp??

// getrecievedtimestamp

// roundtime-timestamp
