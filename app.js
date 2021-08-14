const express = require('express');
const { TopologyDescription } = require('mongodb');
const mysql = require('mysql');

const db = mysql.createConnection({
    /*host: 'localhost',
    user:'root',
    password: 'root',
    database: 'test'
*/
    host: 'aaketpum4ii4nl.cbenxjbir7bt.us-east-2.rds.amazonaws.com',
    user:'admin',
    password: 'letbknown',
    database: 'test'
});

db.connect((err)=>{
  if(err){
      throw err;
  }
  console.log('mysql connected');
});

const app = express();

app.get('/api/fetchdata',(req, res) =>{
 let sql = 'SELECT * FROM test WHERE TYPE = 1';
 let query = db.query(sql, (err,results) => {
     if(err) throw err;
    let response = '';
    for (var i = 0; i < results.length; i++) {
        console.log(results[i]);
        response = "data : " + "Type :" + results[i].type + ", Desc :"+results[i].desc
      }
    res.send(response);
 })
});
app.get('/api/', (req,res)=>{

    res.json({"message:" : "Welcome to hello world"});
});

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log("Hello world");
});


