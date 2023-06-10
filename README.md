[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/suhcjUE-)
# Exam #1: "CMSmall"
## Student: s317842 CAVALLARO SALVATORE 

## React Client Application Routes

- Route `/`: pagina principale che mostra il frontoffice
- Route `/login`: pagina per effettuare il login
- Route `/add`: pagina per aggiungere una nuova pagina
- Route `/edit/:idPagina`: pagina per editare una pagina esistente
- Route `*`: per le pagine che non esistono


## API Server

### Autenticazione

- POST `/api/session`
  Descrizione: Crea una nuova sessione a partire dalla credenziali fornite.

  Request body:
  ```
  {
    "username": "salvo@test.com",
    "password": "pwd"
  }
  ```

Response: `200 OK` (success) or `500 Internal Server Error` (generic error).

Response body: _None_

- GET `/api/session/current`

  Descrizione: Verifica se la sessione data è ancora valida e restituisce le informazioni sull'utente connesso. Per ottenere le informazioni sull'utente autenticato nella sessione corrente, è necessario fornire un cookie con un Id di sessione valido

  Request body: _None_ 

  Response: `201 Created` (success) or `401 Unauthorized` (error).

  Response body:
  ```
  {
    "username": "salvo@test.com",
    "id": 1,
    "name": "Salvo"
  }
  ```
  ... decidere qui quali informazioni ritornare EVENTUALMENTE oltre alle info dell'utente

  -DELETE `/api/session/current`

    Descrizione: Elimina la sessione attualw. è necessario fornire un cookie con un Id di sessione valido.

    Request body: _None_

    Response: `200 OK` (success) or `500 Internal Server Error` (generic error).

    Response body: _None_


### Altre 

 - GET `/api/pages` : Non autenticata, ritorna la lista delle pagine pubblicate
   (devo stabilire un formato JSON appropriato)

- GET `/api/allpages` : Autenticata, ritorna la lista delle pubblicate e non, sia dell'utente autenticato che degli altri utenti.    Parametri: NESSUNO

- POST `/api/study-plan` : Autenticata, salva il piano di studi corrente (rimpiazza l'eventuale esistente)

- DELETE `/api/study-plan` : Autenticata, cancella il piano di studenti

- GET `/api/courses/num-enrolled` : Non autenticata, ritorna solo il n. di studenti iscritti ai corsi con un max.




- POST `/api/something`
  - request parameters and request body content
  - response body content
- ...

## Database Tables

- Table `utenti` : (id, nome, admin: (1=admin), email, salt, hash)
- Table `pagine`: (id,titolo,autore,datacreazione,datapublicazione)
- Table `blocchicotenuto`: (id,tipo)
- Table `blocchiapagine`:(id,idpagina,idblocco,contenuto,priorità)

## Main React Components

- `ListOfSomething` (in `List.js`): component purpose and main functionality
- `GreatButton` (in `GreatButton.js`): component purpose and main functionality
- ...

(only _main_ components, minor ones may be skipped)

## Screenshot

![Screenshot](./img/screenshot.jpg)

## Users Credentials

- username: salvo@test.com, password:"pwd", usertype:admin
- username: giuseppe@test.com, password:"pwd", usertype: not admin 




