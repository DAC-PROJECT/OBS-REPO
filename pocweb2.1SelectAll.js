// Single/select All select through web application........
console.log("practicing  web applications");
const express = require('express');
const app = express();
//app.use(express.static('abc'));
const mysql = require('mysql');
const conn = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "1234",
	database: "test",
	port: 3309
});
// below two lines for the post method use......
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
//regestring for the event
app.get("/getmode", function (req, res) {
    let ro = { "status": 0, content: {} };
    //r1 is parameter name
    const freak = req.query.r1;
   console.log("input got is " + freak);
   const sql = 'select * from OBS ;'
   
   const fillup = [freak];
   conn.query(sql, fillup, function (err, rows) {
       if (err) {
           console.log("we have errors");
       }
       else {
           console.log("no of rows" + rows.length);
           console.log("Result will be seen on postman tool");
           if (rows.length > 0) {
               ro.status = 1;
               ro.content = rows;
           }
       }
    res.send(ro);// automatically it will convert this into json stringify

});
});

app.listen(8087, function () {
    console.log("server starts crawling........");
 
 })
