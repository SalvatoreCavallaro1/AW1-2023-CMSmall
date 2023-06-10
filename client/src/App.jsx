import 'bootstrap/dist/css/bootstrap.min.css';
import { useState,useEffect} from 'react'
import API from './API';
import { Container } from 'react-bootstrap';

//import './App.css'

import { BrowserRouter, Routes, Route,Link } from 'react-router-dom';
import Pages from './components/Pages';

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


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pages pages={pages} errorMsg={errorMsg} resetErrorMsg={()=>setErrorMsg('')} initialLoading={initialLoading}/>}/>
          <Route path='/*' element={<DefaultRoute />} />
        </Routes>
      </BrowserRouter>
    
    </>
  )
}

export default App
