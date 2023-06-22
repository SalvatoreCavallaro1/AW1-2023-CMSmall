BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "utenti" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"email"	TEXT,
	"nome"	TEXT,
    "admin" INTEGER,
	"salt"	TEXT,
    "hash"	TEXT
);
CREATE TABLE IF NOT EXISTS "pagine" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"titolo"	TEXT,
	"autore"	INTEGER,
	"datacreazione" DATE,
	"datapubblicazione"	DATE
);

CREATE TABLE IF NOT EXISTS "blocchicotenuto" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"tipo"	TEXT
);

CREATE TABLE IF NOT EXISTS "blocchipagine" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"idpagina"	INTEGER,
    "idblocco" INTEGER,
    "contenuto" TEXT,
    "priorità" INTEGER
);

CREATE TABLE IF NOT EXISTS "titolo" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"titolo"	TEXT
);

INSERT INTO "utenti" VALUES (1,'salvo@test.com','Salvo',1,'123348dusd437840', 'bddfdc9b092918a7f65297b4ba534dfe306ed4d5d72708349ddadb99b1c526fb'); /* password='pwd' */
INSERT INTO "utenti" VALUES (2,'giuseppe@test.com','Giuseppe',0,'7732qweydg3sd637', '498a8d846eb4efebffc56fc0de16d18905714cf12edf548b8ed7a4afca0f7c1c');
INSERT INTO "blocchicontenuto" VALUES (1,'header'); 
INSERT INTO "blocchicontenuto" VALUES (2,'paragrafo'); 
INSERT INTO "blocchicontenuto" VALUES (3,'immagine'); 
INSERT INTO "pagine" VALUES (1,"I miei strumenti musicali",1,'2023-06-09','2023-06-09'); 
INSERT INTO "blocchipagine" VALUES (1,1,1,"Ecco una foto della batteria",1);
INSERT INTO "blocchipagine" VALUES (2,1,2,"La marca è una DW",2);
INSERT INTO "pagine" VALUES (2,"Torino",2,'2023-07-09','2023-07-09'); 
INSERT INTO "blocchipagine" VALUES (3,2,1,"Qualche foto di torino",1);
INSERT INTO "blocchipagine" VALUES (4,2,2,"Torino è una città del nord Italia dove ha sede l'importante Politecnico",2);
INSERT INTO "titolo" VALUES ("MyCMS");





COMMIT;