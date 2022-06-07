# Code challenge - bycoders_

## Requirements

You will need:
- [x] Postgres database running
- [x] A database called ```transactions_db``` created
- [x] [NodeJS](https://nodejs.org/en/) installed

## How to run

With the database created, run

```
cd api/ && \
  yarn install && \
  yarn typeorm migration:run -d src/infrastructure/interface/database/data-source.ts && \
  yarn seed && \
  yarn start
```
The server will start to listen on port 3006. 

Then,

```
cd .. && \
  cd frontend/ && \
  yarn install && \
  yarn start
```
The frontend will be served on port 3000.

## Uploading a file

Just drag and drop a CNAB.txt file to the dragzone. You will be redirected to a list of transactions by store.

## Goals

- [x] Using NodeJS with Typescript in backend
- [x] Using a relational database
- [x] Using React in frontend
- [x] Unity tests in backend with Jest
- [x] S.O.L.I.D and design patterns applied
- [x] Clean architecture and clean code applied
- [ ] Tests in frontend
- [ ] Docker and docker-compose

There are unreached goals due the challenge deadline, not the complexity.
