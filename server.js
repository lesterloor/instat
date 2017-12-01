var express = require('express')
// process.env.PORT ||
var port     = 3000;
var pug = require('pug')
var axios = require('axios')
var bodyParser = require('body-parser')
var app = express()






///ROUTES ////
require('./app/routes.js')(app); // load our routes and pass in our app and fully configured passport



///MIDDLEWARE ////

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set(express.static('./public'));

/////////////////

app.listen(port);
console.log('The magic happens on port ' + port);
