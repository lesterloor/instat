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
      const username = userInfo.username
        ipp.medium(username).then(userProfilePic => {
            const alldata = [userInfo,userProfilePic]
            console.log(alldata[0].username);
            console.log(alldata[1]);
            res.render('results.pug',{alldata:alldata})
          });
        //=> {description: 'A wonderful description', email: 'unicorns@foo.com', ...}
    }).catch(err =>{
      console.log(err);
      res.render('index.pug',{notfound:`Sorry username does not exist`})
    })
  })



  app.get("/prices", function(req, res) {
    instagramUser("iFunnymeme").then(iFunnymemeInfo => {
        instagramUser("Firstscenes").then(FirstscenesInfo => {
            instagramUser("Waltdisney1901").then(Waltdisney1901Info => {
                instagramUser("video.stylist").then(videostylistInfo => {
                    var sum = [1, 2, 3].reduce(add, 0);

                    function add(a, b) {
                        return a + b;
                        console.log(a+b);    
                    }




                res.render('prices.pug',{totalCount:totalCount,iFunnymemeInfo:iFunnymemeInfo,FirstscenesInfo:FirstscenesInfo,Waltdisney1901Info:Waltdisney1901Info,videostylistInfo:videostylistInfo})

                })
            })
        })
    })
  });
  app.get("/price", function(req, res) {
    instagramUser("iFunnymeme").then(iFunnymemeInfo => {
        instagramUser("Firstscenes").then(FirstscenesInfo => {
            instagramUser("Waltdisney1901").then(Waltdisney1901Info => {
                instagramUser("video.stylist").then(videostylistInfo => {
                    instagramUser("lester").then(lesterInfo => {
                        console.log(lesterInfo);
                        res.render('price.pug',{iFunnymemeInfo:iFunnymemeInfo,FirstscenesInfo:FirstscenesInfo,Waltdisney1901Info:Waltdisney1901Info,videostylistInfo:videostylistInfo,lesterInfo:lesterInfo})
                    })
                })
            })
        })
    })
  });
  app.get("*", function(req, res) {
    res.send('404 error');
  });

}
