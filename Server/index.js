const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql')
const cors = require("cors");

const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'ReactDB',
});
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

//Route for creating the post
app.post('/api/insert', (req,res)=> {

    const userName = req.body.userName;
    const userLastName = req.body.userLastName;
    //const userCountry = req.body.userCountry;
    
    db.query("INSERT INTO User (userName, userLastName) VALUES (?,?)",[userName,userLastName], (err,result)=>{
       if(err) {
       console.log(err)
       } 
       console.log(result)
    });   
});

app.listen(3031, () => {
    console.log('Runing on port 3031');

});