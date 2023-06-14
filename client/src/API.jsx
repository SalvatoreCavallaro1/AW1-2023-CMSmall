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
    throw userInfo;  // an object with the error coming from the server
  }
}


function addPage(page) {
  // call  POST /api/pages
  return new Promise((resolve, reject) => {
    fetch(URL+`/pages`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.assign({}, page, {datacreazione: page.datacreazione.format("YYYY-MM-DD"),datapubblicazione: (page.datapubblicazione)? page.datapubblicazione.format("YYYY-MM-DD") : null})),   
    }).then((response) => {
      if (response.ok) {
        response.json()
          .then((id) => resolve(id))
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      } else {
        // analyze the cause of error
        response.json()
          .then((message) => { reject(message); }) // error message in the response body
          .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
      }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}



const API = {
    getAllPages,
    logIn,
    logOut,
    getUserInfo,
    addPage
  };
  export default API;