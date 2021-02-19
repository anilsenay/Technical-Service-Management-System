
<br />
<p align="center">
  <a href="https://github.com/anilsenay/next-e-commerce">
    <img src="https://i.ibb.co/FK6rBtB/Ekran-G-r-nt-s-18.png" alt="Header photo" >
  </a>

  <h3 align="center">CSE 3055 Project - Technical Service Database & Interface</h3>

  <p align="center">
    A technical service management system built with React, NextJS, NodeJS, ExpressJS and Microsoft Azure Database 
    <br />
    <br />
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Screenshots](#screenshots)
  - [Login](#login)
  - [Dashboard](#dashboard)
  - [Repairment List](#repairment-list)
  - [Repairment Details](#repairment-details)
  - [Create Repairment](#create-repairment)
  - [Order List](#order-list)
  - [Part List](#part-list)
  - [Employee List](#employee-list)
  - [Employee Details](#employee-details)
  - [Payment List](#payment-list)
  - [Settings](#settings)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Issues](#issues)
- [License](#license)
- [Contact](#contact)

<!-- ABOUT THE PROJECT -->

## About The Project

Description

### Built With
##### Front-End
- [React](https://reactjs.org)
- [NextJS](https://nextjs.org/)
- [Sass](https://sass-lang.com/)
##### Back-End
- [NodeJS](https://nodejs.org/)
- [Express](https://expressjs.com/)
##### Database
- [MSSQL](https://www.microsoft.com/tr-tr/sql-server/sql-server-2019)
- [Microsoft Azure Database](https://azure.microsoft.com/en-us/services/sql-database/)
<!-- Screens -->

## Screenshots

### Login

![Login Image](https://i.ibb.co/RQ2L21m/Ekran-G-r-nt-s-16.png)

### Dashboard

![Dashboard Image](https://i.ibb.co/FK6rBtB/Ekran-G-r-nt-s-18.png)

### Repairment List

![Repairment List Image](https://i.ibb.co/PTzwWGY/Ekran-G-r-nt-s-24.png)

### Repairment Details
![Repairment Details Image](https://i.ibb.co/kBVRJwz/Ekran-G-r-nt-s-21.png)

### Create Repairment 
![Repairment Create Image](https://i.ibb.co/vxSyTGS/Ekran-G-r-nt-s-19.png)

### Order List
![Order List Image](https://i.ibb.co/V22V8CR/Ekran-G-r-nt-s-25.png)

### Part List
![Part List Image](https://i.ibb.co/98nv3y0/Ekran-G-r-nt-s-32.png)

### Employee List
![Employee List Image](https://i.ibb.co/VSPxqry/Ekran-G-r-nt-s-22.png)

### Employee Details
![Employee Details Image](https://i.ibb.co/5hWmnqx/Ekran-G-r-nt-s-23.png)

### Payment List
![Payment List Image](https://i.ibb.co/YDXFSY0/Ekran-G-r-nt-s-35.png)

### Settings
![Settings Image](https://i.ibb.co/WFS0Z4T/Ekran-G-r-nt-s-27.png)
<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) version 10.13 or later
- [Git](https://git-scm.com/) 
- [MSSQL](https://www.microsoft.com/tr-tr/sql-server/sql-server-2019)
### Installation

1. You need to create a MSSQL database with [this structure](https://i.ibb.co/bPxjY3p/db-diagram.png)

2. Clone the repo and change directory

```sh
git clone https://github.com/anilsenay/CSE3055_Project.git
cd CSE3055_Project
```

3. Install NPM packages for both server and client by running this command:

```sh
cd server && npm install && cd ../client && npm install
```

4. Create your .env.local file on server's root folder for with this content. Put your private keys. (server/.env)

```
PORT=5000
SERVER=database_server_url
DATABASE=database_name
DB_USERNAME=db_username
DB_PASSWORD=db_password
```

5. Create your .env.local file on clients's root folder for with this content. Put your private keys. (client/.env)

```
NEXT_PUBLIC_API_URL=api_url
```

6. Run in development mode both server and client

```sh
cd server
npm run dev
```
```sh
cd client
npm run dev
```
<!-- Issues / Future plans -->

## Issues

- We had not provide any security for back-end, so use it only in **development**.
- 

<!-- LICENSE -->

## License

Distributed under the GPL License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

- [@anilsenay](https://github.com/anilsenay)
- [@bilgehangecici](https://github.com/bilgehangecici)
- [@mehmetaliyuksel](https://github.com/mehmetaliyuksel)

Project Link: [https://github.com/anilsenay/CSE3055_Project](https://github.com/anilsenay/CSE3055_Project)
