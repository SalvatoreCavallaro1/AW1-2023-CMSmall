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



const API = {
    getAllPages
  };
  export default API;