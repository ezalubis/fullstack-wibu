create database wibu-store;
use wibu-store
create table account(
    id int PRIMARY KEY AUTO_INCREMENT,
    username varchar (50) NOT NULL UNIQUE ,
    password varchar(32),
    store_name varchar(32),
    code_store varchar(32)
)

create table komen(
    id int PRIMARY KEY AUTO_INCREMENT,
    komen varchar(32),
    store_name varchar(32),
    produk varchar(32),
    pengirim text,
    create_at timestamp
)
create table produk(
    id int PRIMARY KEY AUTO_INCREMENT,
    name varchar(32),
    price float,
    description text,
    store_name varchar(32),
    img text,
    rating text
)