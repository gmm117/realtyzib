var express = require('express');
var app = express();
var fs = require('fs');
var request = require('request');
var bodyParser = require("body-parser");

app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/src'));
app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.get('/realtyzib', (req, res) => {
  fs.readFile('./dist/index.html', function(error, data) {
    if(error) {
      console.log(error);
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    }
});
});

app.post('/api/call', function(req,res) {
  var url = 'http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?';
  for(var obj in req.body) {
    url += '&' + obj + '=' + req.body[obj];
  }

  request(url, 
  function (error, response, body) {
      if(error) {
        alert('error');
      } else if(response.statusCode === 200) {
        res.send(body);
      } else {
        alert('response error code : ' + response.statusCode);
      }
  });
});

app.listen(8000, () => {
  console.log('listening on port 8000!')
});

