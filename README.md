# REST API MySQL-tietokannalle

## Tietokanta 

Voit luoda tietokannan suorittamalla seuraavat SQL-koodit
<pre>
create database library;
use library;

create table book(
id_book int primary key auto_increment,
name varchar(80),
author varchar(50),
isbn char(13)
);

insert into book (name,author,isbn)
values('Rautatie','Juhani Aho','123-456-789-2');

insert into book (name,author,isbn)
values('Seitsemän veljestä','Aleksis Kivi','623-956-789-1');
</pre>
Ja tunnuksen suorittamalla seuraavat SQL-koodit
<pre>
CREATE USER 'netuser'@'localhost' 
IDENTIFIED WITH mysql_native_password BY 'netpass';

GRANT ALL on library.* to 'netuser'@'localhost';
</pre>

## .env -tiedosto

Tietokantayhteyttä varten, luo tiedosto nimeltään **.env** ja laita sinne muuttuja
<pre>
SQL_SERVER = 'mysql://netuser:netpass@localhost:3306/library'
</pre>
Ja .env kannattaa laittaa .gitignoreen




