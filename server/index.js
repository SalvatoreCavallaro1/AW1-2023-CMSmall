'use strict';

const express = require('express');
const morgan = require('morgan'); // logging middleware
const {check, validationResult} = require('express-validator'); // validation middleware
const dao = require('./dao'); // module for accessing the DB
const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session = require('express-session'); // enable sessions
//const userDao = require('./user-dao'); // module for accessing the user info in the DB
const cors = require('cors');

// init express
const app = new express();
const port = 3001;

//set-up del middleware
app.use(morgan('dev'));
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions)); 

const answerDelay = 300;

/*API*/

// GET /api/questions
app.get('/api/pages', (req, res) => {
  dao.listAllPages()
    .then(pagine => setTimeout(()=>res.json(pagine), answerDelay))
    .catch((err) => {console.log(err); res.status(500).end()});
});




// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
