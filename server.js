var express = require('express');
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
// app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static('app'));




require('./app/routing/api-route.js')(app); 
require('./app/routing/html-routes.js')(app);
// require('./app/data/friends.js')(app);

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
