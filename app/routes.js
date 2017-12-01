var axios = require('axios')
var bodyParser = require('body-parser')


module.exports = function(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.get('/', function(req, res) {
    res.render('index.pug');

  })
  app.post('/submit', function(req, res) {
    console.log(req.body.search);
    var accessToken = "5724115162.7b3b2a3.97b6d6e6d0164830845fe2568e967da7"
    axios.get(`https://api.instagram.com/v1/users/self/?access_token=${accessToken}`)
  .then(function (response) {
    var results = response.data.data
    console.log(response.data.data);
    res.render('results.pug',{searchData:results});
  })
  .catch(function (error) {
    console.log(error);
  });


  })


  app.get("*", function(req, res) {
    res.send('404 error');
  });

}
