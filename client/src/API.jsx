/**
 * chiamate a tutte le api
 */

import dayjs from "dayjs";

const URL = 'http://localhost:3001/api';



async function getAllPages() {
    // call  /api/pages
    const response = await fetch(URL+'/pages');
    const pages = await response.json();
    if (response.ok) {
      return pages.map((e) => ({id:e.id, titolo: e.titolo, idautore: e.idautore,nomeautore: e.nomeautore,datacreazione:dayjs(e.datacreazione),datapubblicazione:dayjs(e.datapubblicazione),blocchi:e.blocchi}) )
    } else {
      throw pages;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
    }
}



async function getTitolo() {
  // call  /api/titolo
  const response = await fetch(URL+'/titolo');
  const titolo = await response.json();
  //console.log(titolo);
  if (response.ok) {
    return titolo[0]//.map((e) => ({id:e.id, titolo: e.titolo}) )
  } else {
    throw titolo;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
  }
}

async function getUtenti() {
  // call  /api/titolo
  const response = await fetch(URL+'/utenti');
  const utenti = await response.json();
  //console.log(titolo);
  if (response.ok) {
    return utenti.map((e) => ({id:e.id, autore: e.autore, key:e.id}) )
  } else {
    throw utenti;  // mi aspetto che sia un oggetto json fornito dal server che contiene l'errore
  }
}

function updateTitolo(titolo) {
  // call  PUT /api/titolo/<id>
  return new Promise((resolve, reject) => {
    fetch(URL+`/titolo/${titolo.id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.assign({}, titolo)),
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        // analizzo la causa dell'errore
        response.json()
          .then((message) => { reject(message); }) // messaggi d'errore nel response body
          .catch(() => { reject({ error: "Cannot parse server response." }) }); 
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // errori di connessione
  });
}


function deletePage(id) {
  // call  DELETE /api/pages/<id>
  return new Promise((resolve, reject) => {
    fetch(URL+`/pages/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        
        response.json()
          .then((message) => { reject(message); }) 
          .catch(() => { reject({ error: "Cannot parse server response." }) }); 
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); 
  });
}

function deleteBlock(id) {
  // call  DELETE /api/blocks/<id>
  return new Promise((resolve, reject) => {
    fetch(URL+`/blocks/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
       
        response.json()
          .then((message) => { reject(message); }) 
          .catch(() => { reject({ error: "Cannot parse server response." }) }); 
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); 
  });
}

function updatePage(page) {
  // call  PUT /api/page/<id>
  return new Promise((resolve, reject) => {
    fetch(URL+`/pages/${page.id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.assign({}, page)),
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
      
        response.json()
          .then((message) => { reject(message); }) 
          .catch(() => { reject({ error: "Cannot parse server response." }) }); 
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); 
  });
}

function addPage(page) {
  // call  POST /api/pages
  console.log(page);
  return new Promise((resolve, reject) => {
    fetch(URL+`/pages`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
       
        body: JSON.stringify(Object.assign({}, page, {datacreazione: page.datacreazione,datapubblicazione: (page.datapubblicazione)? page.datapubblicazione: null})),   

    }).then((response) => {
      if (response.ok) {
        response.json()
          .then((id) => resolve(id))
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      } else {
       
        response.json()
          .then((message) => { reject(message); }) 
          .catch(() => { reject({ error: "Cannot parse server response." }) });
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) });
  });
}


// login logout session

async function logIn(credentials) {
  let response = await fetch(URL + '/sessions', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (response.ok) {
    const user = await response.json();
    return user;
  } else {
    const errDetail = await response.json();
    throw errDetail.message;
  }
}

async function logOut() {
  await fetch(URL+'/sessions/current', {
    method: 'DELETE', 
    credentials: 'include' 
  });
}

async function getUserInfo() {
  const response = await fetch(URL+'/sessions/current', {
    credentials: 'include'
  });
  const userInfo = await response.json();
  if (response.ok) {
    return userInfo;
  } else {
    throw userInfo;  // oggeto con errore ritornato dal server
  }
}






const API = {
    getAllPages,
    logIn,
    logOut,
    getUserInfo,
    addPage,
    getTitolo,
    updatePage,
    deleteBlock,
    deletePage,
    updateTitolo,
    getUtenti
  };
  export default API;