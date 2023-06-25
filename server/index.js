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
  
  secret: 'ijk8k157lqu84oldip',   
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


// GET /api/titolo
app.get('/api/titolo', (req, res) => {
  dao.getTitolo()
    .then(titolo => setTimeout(()=>res.json(titolo),answerDelay))
    .catch((err) => {console.log(err); res.status(500).end()});
});


// GET /api/utenti
app.get('/api/utenti', (req, res) => {
  dao.getAutori()
    .then(utente => setTimeout(()=>res.json(utente),answerDelay))
    .catch((err) => {console.log(err); res.status(500).end()});
});


//, isLoggedIn,
// POST /api/pages
app.post('/api/pages', [
  check('autore').isInt(),
  check('titolo').isLength({min: 1}),   
  check('datacreazione').isDate({format: 'YYYY-MM-DD', strictMode: true}),
  check('blocchi').isArray(),
  check("blocchi.*.contenuto").isLength({min: 1})
  
]
 ,async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

 
    const page = {
      titolo: req.body.titolo,
      autore: req.body.autore, //req.user.id
      datacreazione: req.body.datacreazione,
      datapubblicazione: req.body.datapubblicazione,
      
    };
    const blocchi=req.body.blocchi;
  
    try {
      const PageId = await dao.createPage(page);
     
        for (const e of blocchi){
       
        let block ={
          idpagina: PageId,
          idblocco: e.idblocco,
          contenuto:e.contenuto,
          priorità:e.priorità,
        }
        let idBlocco= await dao.createBlocks(block);
      }
  
      setTimeout(()=>res.status(201).json(PageId), answerDelay);
    }
      
     catch (err) {
      console.log(err);
      res.status(503).json({ error: `Database error during the creation of page ${page.titolo} id ${PageId} by ${page.autore}.` });
    }
 
});


// PUT /api/pages/<id>
app.put('/api/pages/:id', isLoggedIn, [
  check('autore').isInt(),
  check('titolo').isLength({min: 1}),   
  check('id').isInt(),
  check('blocchi').isArray(),
  check("blocchi.*.contenuto").isLength({min: 1})
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
   
  };
 
 
  page.id = req.params.id;

  try {

    if(req.user.id==1 || req.user.id==3)
    {
      const numRowChanges = await dao.updatePageAdmin(page);  
    
    const blocchi=req.body.blocchi;
    
    for (let e of blocchi){
      if(e.Dbid)
      {
        let Modblock ={
          id:e.Dbid,
          
          idpagina: req.params.id,
          contenuto: e.contenuto,
          priorità: e.priorità
        }
        await dao.updateBlocks(Modblock);
      }
      else
      {
        let block ={
          
          idpagina: req.params.id,
          idblocco: e.idblocco,
          contenuto:e.contenuto,
          priorità:e.priorità,
        }
        let idBlocco= await dao.createBlocks(block);
      }
    }

    setTimeout(()=>res.json(numRowChanges), answerDelay);
    }
    else
    {
      const numRowChanges = await dao.updatePage(page, req.user.id);  
    
    const blocchi=req.body.blocchi;
    
    for (let e of blocchi){
      if(e.Dbid)
      {
        let Modblock ={
          id:e.Dbid,
          
          idpagina: req.params.id,
          contenuto: e.contenuto,
          priorità: e.priorità
        }
        await dao.updateBlocks(Modblock);
      }
      else
      {
        let block ={
          
          idpagina: req.params.id,
          idblocco: e.idblocco,
          contenuto:e.contenuto,
          priorità:e.priorità,
        }
        let idBlocco= await dao.createBlocks(block);
      }
    }

    setTimeout(()=>res.json(numRowChanges), answerDelay);
  }
}
    
   catch(err) {
    console.log(err);
    res.status(503).json({error: `Database error during the update of answer ${req.params.id}.`});
    }
    
  

});


// PUT /api/titolo/<id>
app.put('/api/titolo/:id', isLoggedIn, [
  check('titolo').isLength({min: 1}),   
  check('id').isInt()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

  const titolo = {
    id: req.body.id,
    titolo: req.body.titolo, 
  };
  
  

  try {
    const numRowChanges = await dao.updateTitolo(titolo);  
    setTimeout(()=>res.json(numRowChanges), answerDelay);
   
  } catch(err) {
    console.log(err);
    res.status(503).json({error: `Database error during the update of answer ${req.params.id}.`});
  }

});





// DELETE /api/answers/<id>
app.delete('/api/pages/:id', isLoggedIn, async (req, res) => {
  try {

    if(req.user.id==1 || req.user.id==2)
    {
      const numRowChanges = await dao.deletePageAdmin(req.params.id);
    try
    {
    const numRowChanges2 = await dao.deleteBloccoPagina(req.params.id);
    }catch(err)
    {
      console.log(err);
      res.status(503).json({ error: `Database error during the deletion of blocks of the page ${req.params.id}.`});
    }

  
    setTimeout(()=>res.json(numRowChanges), answerDelay);
    }
    else
    {
    const numRowChanges = await dao.deletePage(req.params.id, req.user.id); 
    try
    {
    const numRowChanges2 = await dao.deleteBloccoPagina(req.params.id);
    }catch(err)
    {
      console.log(err);
      res.status(503).json({ error: `Database error during the deletion of blocks of the page ${req.params.id}.`});
    }

   
    setTimeout(()=>res.json(numRowChanges), answerDelay);
  }
  } 
  
  
  
  catch(err) {
    console.log(err);
    res.status(503).json({ error: `Database error during the deletion of the page ${req.params.id}.`});
  }
});


// DELETE /api/answers/<id>
app.delete('/api/blocks/:id', isLoggedIn, async (req, res) => {
  try {
    const numRowChanges = await dao.deleteBlocco(req.params.id); 
    setTimeout(()=>res.json(numRowChanges), answerDelay);
  } catch(err) {
    console.log(err);
    res.status(503).json({ error: `Database error during the deletion of the block ${req.params.id}.`});
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
        
        
        return res.json(req.user);
      });
  })(req, res, next);
});



// DELETE /sessions/current 
// logout
app.delete('/api/sessions/current', (req, res) => {
  req.logout( ()=> { res.end(); } );
});

// GET /sessions/current
// check se l'utente è loggato oppure no
app.get('/api/sessions/current', (req, res) => {  if(req.isAuthenticated()) {
    res.status(200).json(req.user);}
  else
    res.status(401).json({error: 'Utente non autenicato!'});;
});


// attivazione porta server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
