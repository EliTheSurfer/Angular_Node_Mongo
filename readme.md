# Fantasy Football API

This project is a Fantasy Football API built with Fastify and MongoDB, along with a frontend application.

## Features

- Retrieve all leagues
- Get teams from a specific league
- Get players from a specific team
- User-friendly frontend interface

## Setup

1. Clone the repository
2. Install dependencies:
   - For backend: `cd api && npm install`
   - For frontend: `cd frontend && npm install`
3. Set up your MongoDB connection for the backend:
   - Ensure MongoDB is installed and running on your local machine
   - Create a new database named 'sports':
     - Open MongoDB shell: `mongo`
     - Create the database: `use sports`
   - Restore the initial data:
     ```
     mongorestore --db sports --collection players api/src/frameworks/mongoDB/sports/players.bson
     mongorestore --db sports --collection teams api/src/frameworks/mongoDB/sports/teams.bson
     mongorestore --db sports --collection leagues api/src/frameworks/mongoDB/sports/leagues.bson
     ```
   - The connection string will be: mongodb://localhost:27017/sports
4. Run the applications:
   - Backend: `cd api && npm start`
   - Frontend: `cd frontend && npm start`


## Running the Application

You can run both the backend and frontend simultaneously:

1. be at the root of the project
2. run   
   ```
   npm start
   ```
The backend will start on its designated port, and the frontend will typically start on `http://localhost:4200`.

## API Documentation

API documentation is available via Swagger UI. After starting the backend server, you can access the Swagger documentation at:

`http://localhost:3000/documentation`



