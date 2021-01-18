// SMALLEST WEB APPLICATION........
console.log("practicing  web applications");
const express = require('express');
const app = express();
// below two lines for the post method use......
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
//regestring for the event
app.get("/login", function (req, res) {
    //r1 is parameter name
    let ip = req.query.r1;
    console.log("input got is " + ip);
    let result = { "dk": 3, "pk": 300, mk: 30000 };
    res.send(result);// automatically it will convert this into json stringify

});
app.post("/postupdate", function (req, res) {
    let x = req.body.r2;
    console.log("The post value is " + x);
    let xy = { "message": "post is working" };   
    res.send(xy);

});
app.listen(700, function () {
   console.log("server starts crawling........");

})









