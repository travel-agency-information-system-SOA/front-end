# Travel agency information system (service-oriented architecture)  

This project represents an upgrade in software design, where we transitioned from a monolithic application we previously designed to a service-oriented architecture. 

You can find more information about the project's basis [here](https://github.com/travel-agency-information-system/back-end).

We divided the basic monolith into several sections that became separate applications, each with its own repository, distinct language, and database. 

We ran them together using Docker.

## Front-end 

The front-end represents the client-side component of our system. It provides the interface through which users interact with the back-end (API Gateway). The API Gateway processes requests from the front-end, routing them to the appropriate microservice or combination of microservices to return the correct response to the client.

## Technologies

- ***Central Back-end***: C# (ASP.NET), serving as the API Gateway, managing requests, and orchestrating the overall application flow

- ***Microservices***:
  - ***Encounters***: Go (Golang) with a document-oriented databse (MongoDB)
  - ***Followers***: Go (Golang) with a  graph database (Neo4J)
  - ***Tours***: Go (Golang) with a relational database (PostgreSQL)
  - ***Stakeholders***: Go (Golang) with a relational database (PostgreSQL)
 
- ***Client platform***: Angular (TypeScript, HTML, CSS) with RESTful services for the front-end interface

## Getting started

To set up the project locally using Docker, follow these steps:

```
1. Clone the repository
2. Run the entire setup using Docker Compose
```
- Ensure Docker and Docker Compose are installed and running on your machine
- Use the provided docker-compose.yml file and docker-compose-migrations.yml file to manage the services
- To build and start all services:
```
docker-compose up --build
```
- To stop all services:
```
docker-compose down
```
Use appropriate tools like pgAdmin and MongoDB Compass to interact with the database.

## Configuration

Make sure to review the docker-compose.yml file and Dockerfiles for specific configuration details, such as environment variables, volume mounts, and network settings.

Check the port mappings in docker-compose.yml to ensure that services are properly exposed and accessible.

You can download the files from [this link](https://ufile.io/f/ud3nw). If you are unable to do so, please contact me via email.

## Authors
Contributors to this project:
- Ana Radovanović
- Kristina Zelić
- Milica Petrović
- Petar Kovačević
