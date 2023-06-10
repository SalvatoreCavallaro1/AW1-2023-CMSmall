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
        const sql = `SELECT p.*, u.nome, '[' || GROUP_CONCAT('{"idblocco":' || bp.idblocco || ',"tipo":"' || bc.tipo || '","contenuto":"' || bp.contenuto || '","priorita":' || bp.priorità || '}') || ']' AS blocchi FROM pagine p JOIN blocchipagine bp ON p.id = bp.idpagina JOIN blocchicontenuto bc ON bp.idblocco = bc.id JOIN utenti u ON p.autore = u.id GROUP BY p.id`;
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

