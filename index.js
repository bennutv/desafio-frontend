const express = require('express'),
app = express(),
bodyParser = require('body-parser'),
bennu = require(__dirname + '/bennu.json');

process.env.SECRET_TOKEN = 'javascriptRules';

app.use('/components',  express.static(__dirname +  '/bower_components'));

app.use(express.static(__dirname + '/public'));

app.get('/app/*', function(req, res) {
  // AJAX requests are aren't expected to be redirected to the AngularJS app
  if (req.xhr) {
    return res.status(404).send(req.url + ' not found');
  }

  // `sendfile` requires the safe, resolved path to your AngularJS app
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/list', function(req, res) {
	res.json(bennu);
});

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});
