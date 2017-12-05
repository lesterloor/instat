var axios = require('axios')
var bodyParser = require('body-parser')
var express = require('express');
var path = require('path');
const instagramUser = require('instagram-user');
const ipp = require('instagram-profile-picture');


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
    console.log("User to search",req.body.search);

    instagramUser(req.body.search).then(userInfo => {
      let username = userInfo.username
        ipp.medium(username).then(userProfilePic => {
            let alldata = [userInfo,userProfilePic]
            console.log(alldata[0].username);
            console.log(alldata[1]);
            res.render('results.pug',{alldata:alldata})
          });
        //=> {description: 'A wonderful description', email: 'unicorns@foo.com', ...}
    }).catch(err =>{
      console.log(err);
      res.render('index.pug',{notfound:`Sorry username does not exist`})

    })
    // var accessToken = "5724115162.7b3b2a3.97b6d6e6d0164830845fe2568e967da7"
    // axios.get(`https://api.instagram.com/v1/users/self/?access_token=${accessToken}`)
    //   .then(function (response) {
    //     axios.get(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${accessToken}&count=3`)
    //       .then(function (recentMedia) {
    //         // console.log(recentMedia.data.data);
    //         var results = response.data.data
    //         var recentMedia = recentMedia.data.data
    //         // console.log(response.data.data);
    //         res.render('results.pug',{searchData:results,recentMedia: recentMedia});
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       });
    //     // console.log(response.data.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });


  })


  app.get("/policy", function(req, res) {
    res.render('policy.pug');
  });
  app.get("/login", function(req, res) {

    res.redirect('https://api.instagram.com/oauth/authorize/?client_id=7b3b2a3e21404d9d9e05c5c548f74c0e&redirect_uri=localhost&response_type=token');
  });
  app.get("*", function(req, res) {
    res.send('404 error');
  });

}
