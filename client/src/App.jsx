import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'

//import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pages from './components/Pages';

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pages/>}/>
        </Routes>
      </BrowserRouter>
    
    </>
  )
}

export default App
