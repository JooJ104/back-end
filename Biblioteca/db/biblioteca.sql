use Biblioteca;
desc user;

RENAME TABLE usuario to user;

alter table user modify id_endereco int not null;
alter table user modify id_usuario int not null;
alter table user drop column id_endereco;

alter table user modify column senha varchar(11) not null;
alter table user modify column nome varchar(30) not null;
alter table user modify column email varchar(100) not null;