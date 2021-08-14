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

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://angular-app-1.s3-website.us-east-2.amazonaws.com');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/api/fetchdata',(req, res) =>{
 let sql = 'SELECT * FROM test WHERE TYPE = 1';
 let query = db.query(sql, (err,results) => {
     if(err) throw err;
    let response = '';
    for (var i = 0; i < results.length; i++) {
        console.log(results[i]);
        response = "data : " + "Type :" + results[i].type + ", Desc :"+results[i].desc
      }
    //res.send(response);
    res.json({"type" : results[0].type, "desc":results[0].desc});
 })
});
app.get('/api/', (req,res)=>{

    res.json({"message:" : "Welcome to hello world"});
});

app.get('/', (req,res)=>{

    res.json({"message:" : "success"});
});



const port = process.env.port || 3000;
app.listen(port, () => {
    console.log("Hello world");
});


