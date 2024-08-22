
## Prerequisites

- Node.js and npm installed
- PostgresSQL installed
  
## Overview

This project consists of the client and the server dir. The client is a frontend application developed in nextjs, while the server(nestjs) handles the backend logic and interacts with the database.

### Clone the Repository

First, clone the repository to your local machine:
```bash
git clone https://github.com/zeeshanalico/URL-Shortner.git
```
configure/restore the database
```bash
cd DB
create -U username -c "dbname"
psql -U username dbname < backup.sql
```

## Environment Variables

add a .env.development or .env.production file in server directory with the following environment variables

`MY_PORT` as server port like e.g. 3000
`MY_BASE_URL` e.g. http://localhost:3000
`DATABASE_URL` e.g. postgresql://postgres:admin@localhost:5432/tbsh?schema=public
`SECRET_KEY` any random string

add a .env.development or .env.production file in client directory with the following environment variables
`NEXT_PUBLIC_SERVER_URL`

## Running the Server side of app

```bash
#install dependencies
$ npm install

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Running the Client side of app

```bash
#install dependencies
$ npm install

# development
$ npm run dev
```


## Stay in touch

- Author - [Zeeshan Ali](https://linkedin.com/in/zeeshanalico)

<span id="hashtag">#NextJs</span>
<span id="hashtag">#Nestjs</span>
<span id="hashtag">#Prisma</span>
<span id="hashtag">#Postgres</span>
