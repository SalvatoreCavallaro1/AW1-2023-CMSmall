import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react'
import API from './API';
import { Container } from 'react-bootstrap';
import { LoginForm } from './components/LoginComponent';
//import './App.css'

import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Pages from './components/Pages';
import { PageForm, TitleForm } from './components/PageForm';

function DefaultRoute() {
  return (
    <Container className='App'>
      <h1>Ops elemento non trovato</h1>
      <h2>Route errata!</h2>
      <Link to='/'>Torna alla pagina principale</Link>
    </Container>
  );
}


function App() {
  const [pages, setPages] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const [dirty, setDirty] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [user, setUser] = useState(undefined);
  const [loggedIn, setLoggedIn] = useState(false);
  const [titolo, setTitolo] = useState('');
  const [autori,setAutori]=useState([]);

  function handleError(err) {
    console.log('err: ' + JSON.stringify(err));  // Only for debug
    let errMsg = 'Unkwnown error';
    if (err.errors) {
      if (err.errors[0])
        if (err.errors[0].msg)
          errMsg = err.errors[0].msg;
    } else if (err.error) {
      errMsg = err.error;
    }

    setErrorMsg(errMsg);
    setTimeout(() => setDirty(true), 2000);  // Fetch correct version from server, after a while
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // se l'utente è già loggato salvo le informazioni dell'utente
        const user = await API.getUserInfo();
        setLoggedIn(true);
        setUser(user);
      } catch (err) {
        // L'utente non è ancora autenticato non devo svolgere nessuna azione
        //handleError(err);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (dirty ) {
      API.getTitolo()
        .then((t) => {
          setTitolo(t)
          //setDirty(false);
          //if(pages)
          //setInitialLoading(false)
          API.getAllPages()
            .then((q) => {
              setPages(q)
              setDirty(false);
              // if(titolo)
              setInitialLoading(false)
            })
            .catch((err) => handleError(err));


        })
        .catch((err) => handleError(err));
    }
  }, [dirty]);

  useEffect(()=>
  {
  
    if(dirty && user?.admin==1)
    {
    API.getUtenti()
            .then((u) => {
              //console.log(u);
              setAutori(u)
              //setDirty(false);
              // if(titolo)
             // setInitialLoading(false)
            })
            .catch((err) => handleError(err))
          }
            


  },[dirty])

  /*useEffect(() => {
    if (dirty) {
      API.getAllPages()
        .then((q) => {
          setPages(q)
          setDirty(false);
          // if(titolo)
          setInitialLoading(false)
        })
        .catch((err) => handleError(err));
    }
  }, [dirty]);*/


  




  const doLogOut = async () => {
    await API.logOut();
    setLoggedIn(false);
    setUser(undefined);
    /* set state to empty if appropriate */
  }


  const loginSuccessful = (user) => {
    setUser(user);
    setLoggedIn(true);
    setDirty(true);  // load latest version of data, if appropriate
  }

  const addPage = (e) => {
    // REMEMBER to add questionId
    // e.questionId = question.id;
    //e.respondent = user.name;   // respondentId will be taken by server from the session

    // setAnswerList((oldList) => {
    // Create a new temporary id, waiting for a truly unique id that can only be supplied by the server
    // This temporary id will be replaced when the server will provide its id.

    // NB: Math.max: do not forget ... (spread), max does not take an array as parameter
    // const newTempId = Math.max(...oldList.map((e) => e.id)) + 1;
    // e.id = newTempId;
    // e.status = 'added';
    //return [...oldList, e];
    //}
    //);
    //console.log(e);
    API.addPage(e)
      .then(() => setDirty(true))
      .catch((err) => handleError(err));
  }

  const editPage =(newPage)=>
  {

    setPages((oldList) => oldList.map((e) => {
      if (e.id === newPage.id) {
        newPage.status = 'updated';
        return newPage;
      } else {
        return e;
      }
    }));
    API.updatePage(newPage)
    .then(() => setDirty(true))
    .catch((err) => handleError(err));

  }

  const editTitle=(e)=>{
    API.updateTitolo(e)
      .then(()=> setDirty(true))
      .catch((err)=>handleError(err));
  }

  const deletePage=(pageId)=>{
    API.deletePage(pageId)
    .then(() => { setDirty(true); })
    .catch(e => handleError(e)); 
  }
  /*
  const getAutori=()=>{

    (props.user && props.user.admin)==1?
    API.getUtenti()
            .then((u) => {
              setAutori(u)
              //setDirty(false);
              // if(titolo)
             // setInitialLoading(false)
            })
            .catch((err) => handleError(err))
            :
            setAutori([]);
  }*/



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pages deletePage={deletePage} titolo={titolo} user={user} logout={doLogOut} pages={pages} errorMsg={errorMsg} resetErrorMsg={() => setErrorMsg('')} initialLoading={initialLoading}
          editPage={editPage}/>} />
          <Route path='/login' element={loggedIn ? <Navigate replace to='/' /> : <LoginForm loginSuccessful={loginSuccessful} />} />
          <Route path='/add' element={loggedIn ? <PageForm titolo={titolo} user={user} logout={doLogOut} addPage={addPage} initialLoading={initialLoading} /> : <Navigate replace to='/' />} />
          <Route path='/edit/:PageId' element={loggedIn ? <PageForm titolo={titolo} user={user} logout={doLogOut} initialLoading={initialLoading}
          pageList={pages}
          addPage={addPage} editPage={editPage} handleError={handleError} autori={autori}/> :  <Navigate replace to='/' />} /> 
          <Route path='/titolo/:IdTitolo' element={loggedIn ? <TitleForm titolo={titolo} user={user} logout={doLogOut} initialLoading={initialLoading}
          editTitle={editTitle} handleError={handleError} /> :  <Navigate replace to='/' />}/>
          <Route path='/*' element={<DefaultRoute />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
