'use strict';

/*Data Access Object*/

const sqlite = require ('sqlite3');
const dayjs =require('dayjs');

//apertura del database
const db= new sqlite.Database('cms.db',(err)=>{
    if(err) throw err;
});

//get delle pagine pubblicate
exports.listAllPages=()=>{
    return new Promise( (resolve,reject)=>{
        const sql = `SELECT p.*, u.nome, '[' || GROUP_CONCAT('{"key":' || bp.id || ',"idblocco":' || bp.idblocco || ',"tipo":"' || bc.tipo || '","contenuto":"' || bp.contenuto || '","priorita":' || bp.priorità || '}') || ']' AS blocchi FROM pagine p JOIN blocchipagine bp ON p.id = bp.idpagina JOIN blocchicontenuto bc ON bp.idblocco = bc.id JOIN utenti u ON p.autore = u.id GROUP BY p.id`;
        db.all(sql,[],(err,rows)=>{
            if(err){
                reject(err);
                return;
            }
            const pagine=rows.map((e)=>({id:e.id, titolo: e.titolo, idautore: e.autore,nomeautore: e.nome,datacreazione:e.datacreazione,datapubblicazione:e.datapubblicazione,blocchi:JSON.parse(e.blocchi)}));
            resolve(pagine);
        });
    });
};

exports.getTitolo=()=>{
  return new Promise( (resolve,reject)=>{
      const sql = `SELECT * FROM titolo`;
      db.all(sql,[],(err,rows)=>{
          if(err){
              reject(err);
              return;
          }
          const titolo=rows.map((e)=>({id:e.id, titolo: e.titolo}));
          resolve(titolo);
      });
  });
};

exports.getAutori=()=>{
  return new Promise( (resolve,reject)=>{
      const sql = `SELECT * FROM utenti`;
      db.all(sql,[],(err,rows)=>{
          if(err){
              reject(err);
              return;
          }
          const titolo=rows.map((e)=>({id:e.id, autore: e.nome}));
          resolve(titolo);
      });
  });
};

exports.updateTitolo = (titolo)=> {
  //console.log('updatePage: '+JSON.stringify(page));
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE titolo SET titolo=? WHERE id = ?';  
    
    db.run(sql, [titolo.titolo, titolo.id], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.changes);
    });
  });
};

// aggiungi nuova pagina 
exports.createPage = (pagina) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO pagine(titolo,autore,datacreazione,datapubblicazione) VALUES(?, ?, DATE(?), DATE(?))';
      db.run(sql, [pagina.titolo, pagina.autore, pagina.datacreazione, pagina.datapubblicazione], function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.lastID);
      });
    });
  };

  // blocchipagina update
  exports.createBlocks = (blocchi) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO blocchipagine(idpagina,idblocco,contenuto,priorità) VALUES(?, ?, ?, ?)';
      db.run(sql, [blocchi.idpagina, blocchi.idblocco, blocchi.contenuto, blocchi.priorità], function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.lastID);
      });
    });
  };



  exports.updatePage = (pagina,userId) => {
    //console.log('updatePage: '+JSON.stringify(page));
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE pagine SET titolo=?, autore=?,datapubblicazione=DATE(?) WHERE id = ? AND autore = ?';  
      // passo l'userid per controllare che veramente quella pagina appartiene all'utente autenticato
      db.run(sql, [pagina.titolo, pagina.autore, pagina.datapubblicazione,pagina.id,userId], function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.changes);
      });
    });
  };

  exports.updatePageAdmin = (pagina) => {
    //console.log('updatePage: '+JSON.stringify(page));
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE pagine SET titolo=?, autore=?,datapubblicazione=DATE(?) WHERE id = ?';  
     
      db.run(sql, [pagina.titolo, pagina.autore, pagina.datapubblicazione,pagina.id], function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.changes);
      });
    });
  };

  exports.deleteBloccoPagina= (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM blocchipagine WHERE idpagina = ?';  
      db.run(sql, [id], function (err) {
        if (err) {
          reject(err);
          return;
        } else
          resolve(this.changes);  // ritorna il numeo di righe
      });
    });
  }

  exports.deletePage = (id, userId) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM pagine WHERE id = ? AND autore = ?';  // Double-check that the answer belongs to the userId
      console.log(db.run(sql, [id, userId]));
      db.run(sql, [id, userId], function (err) {
        if (err) {
          reject(err);
          return;
        } else
          resolve(this.changes);  // return the number of affected rows
      });
    });
  }

  exports.deletePageAdmin = (id, userId) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM pagine WHERE id = ?';  
      console.log(db.run(sql, [id]));
      db.run(sql, [id, userId], function (err) {
        if (err) {
          reject(err);
          return;
        } else
          resolve(this.changes);  
      });
    });
  }
  

  exports.getBlocchi=()=>{
    return new Promise( (resolve,reject)=>{
        const sql = `SELECT * FROM blocchipagine`;
        db.all(sql,[],(err,rows)=>{
            if(err){
                reject(err);
                return;
            }
            const blocchi=rows.map((e)=>({id:e.id, idpagina: e.idpagina, idblocco:e.idblocco, contenuto: e.contenuto, priorità: e.priorità}));
            resolve(blocchi);
        });
    });
  };


  exports.updateBlocks = (blocco) => {
    //console.log('updateBlocks: '+JSON.stringify(blocco));
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE blocchipagine SET contenuto=?, priorità=? WHERE id = ? AND idpagina=?';  
      
      db.run(sql, [blocco.contenuto, blocco.priorità, blocco.id, blocco.idpagina], function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.changes);
      });
    });
  };
  
  exports.deleteBlocco = (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM blocchipagine WHERE id = ?';  
      db.run(sql, [id], function (err) {
        if (err) {
          reject(err);
          return;
        } else
          resolve(this.changes);  
      });
    });
  }



