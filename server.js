var express = require("express");
var bodyParser = require("body-parser");

var apiRoutes = require("./app/routing/apiRoutes");
var htmlRoutes = require("./app/routing/htmlRoutes");

var app = express();


var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Register Routes
apiRoutes(app);
htmlRoutes(app);

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
