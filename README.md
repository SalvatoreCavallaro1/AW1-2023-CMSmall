[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/suhcjUE-)
# Exam #1: "CMSmall"
## Student: s317842 CAVALLARO SALVATORE 

## React Client Application Routes

- Route `/`: pagina principale che mostra il frontoffice
- Route `/login`: pagina per effettuare il login
- Route `/backoffice`: pagina che mostra il backoffice
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

### Altre 

- POST `/api/something`
  - request parameters and request body content
  - response body content
- ...

## Database Tables

- Table `users` - contains xx yy zz
- Table `something` - contains ww qq ss
- ...

## Main React Components

- `ListOfSomething` (in `List.js`): component purpose and main functionality
- `GreatButton` (in `GreatButton.js`): component purpose and main functionality
- ...

(only _main_ components, minor ones may be skipped)

## Screenshot

![Screenshot](./img/screenshot.jpg)

## Users Credentials

- username, password (plus any other requested info)
- username, password (plus any other requested info)

