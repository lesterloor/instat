module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render('index.pug',{title:'Home Page'});
  })

}