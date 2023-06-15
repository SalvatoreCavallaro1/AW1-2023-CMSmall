import 'bootstrap/dist/css/bootstrap.min.css';
import { useState,useEffect} from 'react'
import API from './API';
import { Container } from 'react-bootstrap';
import { LoginForm } from './components/LoginComponent';
//import './App.css'

import { BrowserRouter, Routes, Route,Link,Navigate } from 'react-router-dom';
import Pages from './components/Pages';
import PageForm from './components/PageForm';

function DefaultRoute() {
  return(
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



  function handleError(err) {
    console.log('err: '+JSON.stringify(err));  // Only for debug
    let errMsg = 'Unkwnown error';
    if (err.errors) {
      if (err.errors[0])
        if (err.errors[0].msg)
          errMsg = err.errors[0].msg;
    } else if (err.error) {
      errMsg = err.error;
    }

    setErrorMsg(errMsg);
    setTimeout(()=>setDirty(true), 2000);  // Fetch correct version from server, after a while
  }

  useEffect(()=> {
    const checkAuth = async() => {
      try {
        // se l'utente è già loggato salvo le informazioni dell'utente
        const user = await API.getUserInfo();
        setLoggedIn(true);
        setUser(user);
      } catch(err) {
        // L'utente non è ancora autenticato non devo svolgere nessuna azione
        //handleError(err);
      }
    };
    checkAuth();
  }, []);

  useEffect( () => {
  if(dirty){
    API.getAllPages()
      .then((q) => {setPages(q)
        setDirty(false);
        setInitialLoading(false)
      })
      .catch((err) => handleError(err));
  }
  }, [dirty]);

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



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pages user={user} logout={doLogOut} pages={pages} errorMsg={errorMsg} resetErrorMsg={()=>setErrorMsg('')} initialLoading={initialLoading}/>}/>
          <Route path='/login' element={loggedIn? <Navigate replace to='/' />:  <LoginForm loginSuccessful={loginSuccessful} />} />
          <Route path='/add' element={loggedIn? <PageForm user={user} logout={doLogOut}/>:  <Navigate replace to='/' /> } />
          <Route path='/*' element={<DefaultRoute />} />
        </Routes>
      </BrowserRouter>
    
    </>
  )
}

export default App
