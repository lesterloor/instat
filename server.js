var express = require('express')
var port     = process.env.PORT || 8500;
var pug = require('pug')
var axios = require('axios')
var bodyParser = require('body-parser')
var app = express()
var path = require('path');






///ROUTES ////
require('./app/routes.js')(app); // load our routes and pass in our app and fully configured passport



///MIDDLEWARE ////

app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'))

/////////////////

app.listen(port);
console.log('The magic happens on port ' + port);
