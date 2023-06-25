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
  const [appStatus,setAppStatus]=useState("front");

  function handleError(err) {
    //console.log('err: ' + JSON.stringify(err));  // Only for debug
    let errMsg = 'Unkwnown error';
    if (err.errors) {
      if (err.errors[0])
        if (err.errors[0].msg)
          errMsg = err.errors[0].msg;
    } else if (err.error) {
      errMsg = err.error;
    }

    setErrorMsg(errMsg);
    setTimeout(() => setDirty(true), 2000);  // Fetch versione corretta dal server dopo un pò
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
         
          API.getAllPages()
            .then((q) => {
              setPages(q)
              setDirty(false);
              
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
              setAutori(u)
            })
            .catch((err) => handleError(err))
          }
            


  },[dirty])

 
  const doLogOut = async () => {
    await API.logOut();
    setLoggedIn(false);
    setAppStatus("front");
    setUser(undefined);
    
  }


  const loginSuccessful = (user) => {
    setUser(user);
    setLoggedIn(true);
    setDirty(true);  
  }

  const addPage = (e) => {
  
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
 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pages appStatus={appStatus} setAppStatus={setAppStatus} deletePage={deletePage} titolo={titolo} user={user} logout={doLogOut} pages={pages} errorMsg={errorMsg} resetErrorMsg={() => setErrorMsg('')} initialLoading={initialLoading}
          editPage={editPage}/>} />
          <Route path='/login' element={loggedIn ? <Navigate replace to='/' /> : <LoginForm loginSuccessful={loginSuccessful} />} />
          <Route path='/add' element={loggedIn ? <PageForm appStatus={appStatus} setAppStatus={setAppStatus} titolo={titolo} user={user} logout={doLogOut} addPage={addPage} initialLoading={initialLoading} /> : <Navigate replace to='/' />} />
          <Route path='/edit/:PageId' element={loggedIn ? <PageForm appStatus={appStatus} setAppStatus={setAppStatus} titolo={titolo} user={user} logout={doLogOut} initialLoading={initialLoading}
          pageList={pages}
          addPage={addPage} editPage={editPage} handleError={handleError} autori={autori}/> :  <Navigate replace to='/' />} /> 
          <Route path='/titolo/:IdTitolo' element={loggedIn ? <TitleForm appStatus={appStatus} setAppStatus={setAppStatus} titolo={titolo} user={user} logout={doLogOut} initialLoading={initialLoading}
          editTitle={editTitle} handleError={handleError} /> :  <Navigate replace to='/' />}/>
          <Route path='/*' element={<DefaultRoute />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
