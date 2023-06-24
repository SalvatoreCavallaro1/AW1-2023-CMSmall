'use strict';

const express = require('express');
const morgan = require('morgan'); // logging middleware
const {check, validationResult} = require('express-validator'); // validation middleware
const dao = require('./dao'); // module for accessing the DB
const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session = require('express-session'); // enable sessions
const userDao = require('./user-dao'); // module for accessing the user info in the DB
const cors = require('cors');


/* Setup di Passport*/
//si usano username che corrisponde alla mail e password come dati di login
passport.use(new LocalStrategy(
  function(username, password, done) {
    userDao.getUser(username, password).then((user) => {
      if (!user)
        return done(null, false, { message: 'Username  o password errati' });
        
      return done(null, user);
    })
  }
));

// serialize e de-serialize dell'utente (user object <-> session)
// serializzo l'id dell'utente e lo serializzo nella sessione: in questo modo la sessione è molto piccola, occupa poco spazio
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// a partire dai dati nella sessione si estrae il loggen-in user corrente
passport.deserializeUser((id, done) => {
  userDao.getUserById(id)
    .then(user => {
      done(null, user); // questo sarà disponibile in req.user
    }).catch(err => {
      done(err, null);
    });
});



// init express
const app = new express();
const port = 3001;

//set-up del middleware
app.use(express.static('./public'));
app.use(morgan('dev'));
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions)); 

const answerDelay = 1;

//middleware per identare se una request arriva da un utente autenticato
const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated())
    return next();
  
  return res.status(401).json({ error: 'Utente non autenticato'});
}

// set up the della sessione
app.use(session({
  // by default, Passport uses a MemoryStore to keep track of the sessions
  secret: 'ijk8k157lqu84oldip',   //personalize this random string, should be a secret value
  resave: false,
  saveUninitialized: false 
}));

// inizializzazione di passport
app.use(passport.initialize());
app.use(passport.session());


/*API*/

// GET /api/pages
app.get('/api/pages', (req, res) => {
  dao.listAllPages()
    .then(pagine => setTimeout(()=>res.json(pagine), answerDelay))
    .catch((err) => {console.log(err); res.status(500).end()});
});


// GET /api/pages
app.get('/api/titolo', (req, res) => {
  dao.getTitolo()
    .then(titolo => setTimeout(()=>res.json(titolo),answerDelay))
    .catch((err) => {console.log(err); res.status(500).end()});
});


//, isLoggedIn,
// POST /api/answers
app.post('/api/pages', [
  check('autore').isInt(),
  check('titolo').isLength({min: 1}),   
  check('datacreazione').isDate({format: 'YYYY-MM-DD', strictMode: true})
  //check('datapubblicazione').isDate({format: 'YYYY-MM-DD', strictMode: true})
]
 ,async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

  //const questionId = req.body.questionId;
  //const resultQuestion = await dao.getQuestion(questionId);  // needed to ensure db consistency
  //if (resultQuestion.error)
   // res.status(404).json(resultQuestion);   // questionId does not exist, please insert the question before the answer
  //else {
    const page = {
      titolo: req.body.titolo,
      autore: req.body.autore, //req.user.id
      datacreazione: req.body.datacreazione,
      datapubblicazione: req.body.datapubblicazione,
      //respondentId: req.user.id,    // It is WRONG to use something different from req.user.id, DO NOT SEND it from client!
    };
    const blocchi=req.body.blocchi;
    //console.log("answer to add: "+JSON.stringify(answer));
//PageId
    try {
      const PageId = await dao.createPage(page);
     // if(PageId){
        for (const e of blocchi){
        //let blocco=[...req.body.blocchi[i]];
        let block ={
          idpagina: PageId,
          idblocco: e.idblocco,
          contenuto:e.contenuto,
          priorità:e.priorità,
        }
        let idBlocco= await dao.createBlocks(block);
      }
   // }
        // Return the newly created id of the page to the caller. 
      // A more complex object can also be returned (e.g., the original one with the newly created id)
      setTimeout(()=>res.status(201).json(PageId), answerDelay);
    }
      
     catch (err) {
      console.log(err);
      res.status(503).json({ error: `Database error during the creation of page ${page.titolo} by ${page.autore}.` });
    }
  //}
});


// PUT /api/pages/<id>
app.put('/api/pages/:id', isLoggedIn, [
  check('autore').isInt(),
  check('titolo').isLength({min: 1}),   
  //check('datacreazione').isDate({format: 'YYYY-MM-DD', strictMode: true}),
  check('id').isInt()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

  const page = {
    id:req.params.id,
    titolo: req.body.titolo,
    autore: req.body.autore, //req.user.id
    datapubblicazione: req.body.datapubblicazione,
    //respondentId: req.user.id,    // It is WRONG to use something different from req.user.id, DO NOT SEND it from client!
  };
  console.log(page);
  const blocchi=req.body.blocchi;
  const blocchiInDB= dao.getBlocchi()
  .then(blocks => setTimeout(()=>res.json(blocks), answerDelay))
  .catch((err) => {console.log(err); res.status(500).end()});
  // you can also check here if the id passed in the URL matches with the id in req.body,
  // and decide which one must prevail, or return an error
  page.id = req.params.id;

  try {
    const numRowChanges = await dao.updatePage(page, req.user.id);  // It is WRONG to use something different from req.user.id, do not send it from client!
    // NB: the query in the DB will check if the answer belongs to the authenticated user and not another, using WHERE respondentId=...
    let trovato=0;
    for (let e of blocchi){
      if(e.Dbid)
      {
        let Modblock ={
          id:e.Dbid,
          //idpagina: e.idpagina,
          idpagina: req.params.id,
          contenuto: e.contenuto,
          priorità: e.priorità
        }
        await dao.updateBlocks(Modblock);
      }
      else
      {
        let block ={
          //idpagina: e.idpagina,
          idpagina: req.params.id,
          idblocco: e.idblocco,
          contenuto:e.contenuto,
          priorità:e.priorità,
        }
        let idBlocco= await dao.createBlocks(block);
      }
     /* for(let e2 of blocchiInDB )

    {
      //let blocco=[...req.body.blocchi[i]];
      if(e.Dbid==e2.id)
      {

        let Modblock ={
          id:e.Dbid,
          //idpagina: e.idpagina,
          idpagina: req.params.id,
          contenuto: e.contenuto,
          priorità: e.priorità
        }
        await dao.updateBlocks(Modblock);
        
      }
      else if(!e.Dbid || e.Dbid==null || e.Dbid=='')
      {
        let block ={
          //idpagina: e.idpagina,
          idpagina: req.params.id,
          idblocco: e.idblocco,
          contenuto:e.contenuto,
          priorità:e.priorità,
        }
        let idBlocco= await dao.createBlocks(block);
      }



      
      //let idBlocco= await dao.createBlocks(block);



    }*/
      
    }
    setTimeout(()=>res.json(numRowChanges), answerDelay);
    //res.status(200).end();
  } catch(err) {
    console.log(err);
    res.status(503).json({error: `Database error during the update of answer ${req.params.id}.`});
  }

});


// PUT /api/titolo/<id>
app.put('/api/titolo/:id', isLoggedIn, [
  //check('autore').isInt(),
 // check('titolo').isLength({min: 1}),   
  //check('datacreazione').isDate({format: 'YYYY-MM-DD', strictMode: true}),
  check('id').isInt()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

  const titolo = {
    id: req.body.id,
    titolo: req.body.titolo, //req.user.id
    //datapubblicazione: req.body.datapubblicazione,
    //respondentId: req.user.id,    // It is WRONG to use something different from req.user.id, DO NOT SEND it from client!
  };
  
  
  // you can also check here if the id passed in the URL matches with the id in req.body,
  // and decide which one must prevail, or return an error
  //page.id = req.params.id;

  try {
    const numRowChanges = await dao.updateTitolo(titolo);  // It is WRONG to use something different from req.user.id, do not send it from client!
    // NB: the query in the DB will check if the answer belongs to the authenticated user and not another, using WHERE respondentId=...
    
    setTimeout(()=>res.json(numRowChanges), answerDelay);
    //res.status(200).end();
  } catch(err) {
    console.log(err);
    res.status(503).json({error: `Database error during the update of answer ${req.params.id}.`});
  }

});





// DELETE /api/answers/<id>
app.delete('/api/pages/:id', isLoggedIn, async (req, res) => {
  try {
    const numRowChanges = await dao.deletePage(req.params.id, req.user.id); // It is WRONG to use something different from req.user.id
    // number of changed rows is sent to client as an indicator of success
    setTimeout(()=>res.json(numRowChanges), answerDelay);
  } catch(err) {
    console.log(err);
    res.status(503).json({ error: `Database error during the deletion of answer ${req.params.id}.`});
  }
});


// DELETE /api/answers/<id>
app.delete('/api/blocks/:id', isLoggedIn, async (req, res) => {
  try {
    const numRowChanges = await dao.deleteAnswer(req.params.id); // It is WRONG to use something different from req.user.id
    // number of changed rows is sent to client as an indicator of success
    setTimeout(()=>res.json(numRowChanges), answerDelay);
  } catch(err) {
    console.log(err);
    res.status(503).json({ error: `Database error during the deletion of answer ${req.params.id}.`});
  }
});





/*API utente*/ 


// POST /sessions 
// login
app.post('/api/sessions', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
      if (!user) {
        // display wrong login messages
        return res.status(401).json(info);
      }
      // success, perform the login
      req.login(user, (err) => {
        if (err)
          return next(err);
        
        // req.user contains the authenticated user, we send all the user info back
        // this is coming from userDao.getUser()
        return res.json(req.user);
      });
  })(req, res, next);
});

// ALTERNATIVE: if we are not interested in sending error messages...
/*
app.post('/api/sessions', passport.authenticate('local'), (req,res) => {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.json(req.user);
});
*/

// DELETE /sessions/current 
// logout
app.delete('/api/sessions/current', (req, res) => {
  req.logout( ()=> { res.end(); } );
});

// GET /sessions/current
// check whether the user is logged in or not
app.get('/api/sessions/current', (req, res) => {  if(req.isAuthenticated()) {
    res.status(200).json(req.user);}
  else
    res.status(401).json({error: 'Utente non autenicato!'});;
});


// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
