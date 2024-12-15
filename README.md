# Deployment Guide for Backend and Frontend Application

## Table of Contents
- [Deployment Guide for Backend and Frontend Application](#deployment-guide-for-backend-and-frontend-application)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Backend Deployment (Node.js)](#backend-deployment-nodejs)
  - [Frontend Deployment (React.js)](#frontend-deployment-reactjs)

## Prerequisites
* Node.js installed on your system (for backend)
* yarn installed on your system

## Backend Deployment (Node.js)
1. Clone the repository.
2. Navigate to the backend directory: `cd backend`
3. Install the required dependencies: `yarn install`
4. Create a new file named `.env` and add the following environment variables:
   ```PORT="5500"
      HOST="localhost"
      AUTH_KEY="keyless"
5. Build the backend server: `yarn build`
6. Run build using `yarn start`

## Frontend Deployment (React.js)
1. Clone the repository.
2. Navigate to the frontend directory: `cd frontend`
3. Install the required dependencies: `yarn install`
4. Create a new file named `.env` and add the following environment variables:
   ```REACT_APP_AUTH_KEY="keyless"```
5. Build the backend server: `yarn build`
