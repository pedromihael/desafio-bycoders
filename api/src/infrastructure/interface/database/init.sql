CREATE DATABASE transactions_db;

CREATE USER postgres with password 'postgres';

GRANT ALL PRIVILEGES ON DATABASE transactions_db TO postgres;