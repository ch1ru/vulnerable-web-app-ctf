CREATE DATABASE IF NOT EXISTS usersdb;

UPDATE mysql.user SET Host='192.168.10.%' WHERE Host='localhost' AND User='admin';

UPDATE mysql.db SET Host='192.168.10.%' WHERE Host='localhost' AND User='admin';

FLUSH PRIVILEGES;

USE usersdb;

CREATE TABLE IF NOT EXISTS credentials
(
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT UQ_Username UNIQUE (username)
);

CREATE TABLE IF NOT EXISTS tokens
(
    username VARCHAR(100) NOT NULL,
    token VARCHAR(200) NOT NULL,
    PRIMARY KEY (username),
    CONSTRAINT UQ_Username UNIQUE (username)
);