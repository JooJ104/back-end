create database Organelas;
use Organelas;

create table usuario (
idUser INT PRIMARY KEY ,
username VARCHAR (20) NOT NULL,
password VARCHAR(8) NOT NULL
);

RENAME TABLE usuario to user;

insert into user (idUser, username, password) values
(1,'João','teste');

insert into user (idUser, username, password) values
(2,'Roberto','banana');

insert into user (idUser, username, password) values
(3,'Ryan','ovelha');

select * from user; 

SELECT password FROM user WHERE username = 'João' and password = 'teste';