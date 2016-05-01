const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.static("public"));

const server = app.listen(8091, function () {
  app.get('/asset', function(req, res){
    res.send({
      status: 'OK'
    });
  });
});