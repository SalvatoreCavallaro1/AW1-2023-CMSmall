BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "utenti" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"email"	TEXT,
	"name"	TEXT,
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
INSERT INTO "utenti" VALUES (1,'salvo@test.com','Salvo',1,'123348dusd437840', 'bddfdc9b092918a7f65297b4ba534dfe306ed4d5d72708349ddadb99b1c526fb'); /* password='pwd' */
INSERT INTO "utenti" VALUES (2,'giuseppe@test.com','Giuseppe',0,'7732qweydg3sd637', '498a8d846eb4efebffc56fc0de16d18905714cf12edf548b8ed7a4afca0f7c1c');
COMMIT;