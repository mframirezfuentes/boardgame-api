# boardgame-api
This api is about board games.

## Build with 🖥️

 - Javascript
 - Neo4j
 - Mongo

## Pre-Requisites🦾

[](https://github.com/KranioIO/Talentops-v2#pre-requisites)

1.  [Docker Desktop](https://www.docker.com/products/docker-desktop/)
3.  [NodeJS (version LTS >20+)](https://nodejs.org/en)
4.  [MongoDB](https://www.mongodb.com/)
5.  [Neo4j](https://neo4j.com/docs/getting-started/)


## Local Development Instructions🤖:

[](https://github.com/KranioIO/Talentops-v2#local-development-instructions)

1.  Clone the repository using  `git clone https://github.com/mframirezfuentes/boardgame-api.git`
2.  Go to the folder the repository local  `cd boardgame`
3.  Install dependencies by running  `npm install`.
4.  Up the containers and images with  `docker-compose up -d`
    -   To stop containers  `docker-compose stop`
    -   To start containers  `docker-compose start`
    -   To destroy the containers  `docker-compose down`
5.  Run the command  `node .\src\config\scripts\load_data.js`   to populate the neo4j database.
6.  Ask me about the MongoDB and Neo4j database credentials.
3