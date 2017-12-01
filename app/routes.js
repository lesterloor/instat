var axios = require('axios')
var bodyParser = require('body-parser')
var express = require('express');
var path = require('path');


module.exports = function(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(express.static('public'))

  app.get('/', function(req, res) {
    res.render('index.pug');

  })
  app.post('/submit', function(req, res) {
    console.log(req.body.search);
    var accessToken = "5724115162.7b3b2a3.97b6d6e6d0164830845fe2568e967da7"
    axios.get(`https://api.instagram.com/v1/users/self/?access_token=${accessToken}`)
      .then(function (response) {
        axios.get(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${accessToken}&count=3`)
          .then(function (recentMedia) {
            console.log(recentMedia.data.data);
            var results = response.data.data
            var recentMedia = recentMedia.data.data
            // console.log(response.data.data);
            res.render('results.pug',{searchData:results,recentMedia: recentMedia});
          })
          .catch(function (error) {
            console.log(error);
          });
        // console.log(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });


  })


  app.get("/policy", function(req, res) {
    res.render('policy.pug');
  });
  app.get("*", function(req, res) {
    res.send('404 error');
  });

}
