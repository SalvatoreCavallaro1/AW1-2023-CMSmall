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



const API = {
    getAllPages,
    logIn,
    logOut,
    getUserInfo
  };
  export default API;