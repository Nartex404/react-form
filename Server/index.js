const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql')
const cors = require("cors");

const db = mysql.createPool({
    host:'reactdbaws.cfnro2e8t5cb.us-east-2.rds.amazonaws.com',
    user:'admin',
    password:'Nartex404',
    database:'ReactDBAWS',
});
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

//Route for get all data from Users table in DB
app.get("/api/getUsers", (req,res) => {
    const sqlSelect =  "SELECT * FROM User";
    db.query (sqlSelect, (err,result) => {
        res.send(result)
         });   
});

//Route for get all countries from DB
app.get("/api/get", (req,res) => {
    const sqlSelect =  "SELECT * FROM Countries";
    db.query (sqlSelect, (err,result) => {
        res.send(result)
         });   
});

//Route for creating the post to insert data on DB
app.post('/api/insert', (req,res)=> {

    const userName = req.body.userName;
    const userLastName = req.body.userLastName;
    const userCountry = req.body.userCountry;
    
    db.query("INSERT INTO User (userName, userLastName,userCountry) VALUES (?,?,?)",[userName,userLastName,userCountry], (err,result)=>{
       if(err) {
       console.log(err)
       } 
       console.log(result)
    });   
});

app.listen(3031, () => {
    console.log('Runing on port 3031');

});