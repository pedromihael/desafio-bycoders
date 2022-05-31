FROM node:14-alpine
ADD api/src/infrastructure/interface/database/init.sql /docker-entrypoint-initdb.d/

# Diretorio da aplicação dentro do container
WORKDIR /usr/app

# Copiando o package json e yarn lock para poder instalar as dependencias
COPY ./api/package.json ./
COPY ./api/yarn.lock ./

# Executando a instalação dos pacotes
RUN yarn install

# Copiando o restante dos arquivos
COPY . .