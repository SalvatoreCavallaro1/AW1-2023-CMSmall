'use strict'

const sqlite=require('sqlite3');
const crypto =require('crypto');

//apertura database
const db = new sqlite.Database('cms.db', (err) => {
    if(err) throw err;
  });

exports.getUserById = (id) => {
return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM utenti WHERE id = ?';
    db.get(sql, [id], (err, row) => {
        if (err) 
        reject(err);
        else if (row === undefined)
        resolve({error: 'Utente non trovato'});
        else {
        // by default, the local strategy looks for "username": not to create confusion in server.js, we can create an object with that property
        const user = {id: row.id, username: row.email, name: row.nome}
        resolve(user);
        }
    });
});
};

exports.getUser = (email, password) => {
    return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM utenti WHERE email = ?';
    db.get(sql, [email], (err, row) => {
        if (err) { reject(err); }
        else if (row === undefined) { resolve(false); }
        else {
        const user = {id: row.id, username: row.email, name: row.nome};
        
        const salt = row.salt;
        crypto.scrypt(password, salt, 32, (err, hashedPassword) => {
            if (err) reject(err);

            const passwordHex = Buffer.from(row.hash, 'hex');

            if(!crypto.timingSafeEqual(passwordHex, hashedPassword))
            resolve(false);
            else resolve(user); 
        });
        }
    });
    });
};