# MM

Service which provides both a websocket server and a REST endpoint

## Let's start

### Previous requeriments

+ Nodejs + npm: https://nodejs.org/en/download/
+ Docker: https://docs.docker.com/get-docker/
+ sequelize-cli: npm i -g sequelize-cli

### Instalation 🔧 
#### Clone project 📂

git clone https://github.com/JulianNicolas/MM

#### Running MySQL

- cd MM/server
- ../MM/server> docker-compose -f "docker-compose.yml" up -d --build

if you are working on new Macbook M1 you should pull this image before running docker-compose
- docker pull --platform linux/x86_64 mysql:8.0.22

#### Database init
##### Create user
- ../MM/server> docker exec -it mysql_mm mysql -uroot -p
- password: root

- mysql> CREATE USER 'myuser'@'%' IDENTIFIED BY 'mypassword';
- mysql> grant all on *.* to 'myuser'@'%';
- mysql> exit;

##### Create database and tables

- ../MM/server> npm i
- ../MM/server> npx sequelize db:create
- ../MM/server> npx sequelize db:migrate
#### Server 📦

* cd MM/server
* npm run build
* npm run start

### Let's see it in action

Open your browser and navigate to localhost:3000

### Tech stack 

* Node.js + Express.js + Typescript
* MySQL
* Sequelize
* Socket.IO

## Author ✒️

* **Julián Antonucci** - - [JulianNicolas](https://github.com/JulianNicolas)
