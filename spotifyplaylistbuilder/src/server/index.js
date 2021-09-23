const express = require('express');
const mysql = require("mysql");


const app = express();

app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "LoginSystem",
});


app.listen(3002, () => {
    console.log('running on port 3002')
})