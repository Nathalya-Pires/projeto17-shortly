CREATE DATABASE shortly;

CREATE TABLE users (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" text NOT NULL UNIQUE,
	"password" varchar(50) NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT 'now()'
);



CREATE TABLE "urlsShortly" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL REFERENCES users(id),
	"url" TEXT NOT NULL,
	"shortUrl" TEXT NOT NULL,
	"views" int NOT NULL DEFAULT '0',
	"createdAt" TIMESTAMP NOT NULL DEFAULT 'now()'
);



CREATE TABLE sessions (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL REFERENCES users(id),
	"token" TEXT NOT NULL UNIQUE,
	"createdAt" TIMESTAMP NOT NULL DEFAULT 'now()'
);




