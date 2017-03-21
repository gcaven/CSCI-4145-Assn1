var express = require('express');
var bodyParser = require('body-parser')
var path = require('path');
var app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Listening on port %s", port);
});

function convert(unit, value, response) {
  if (typeof value !== 'number') {
    return response.status(400).send();
  }
  if (unit == 'celsius') {
    //C to F
    //Multiply by 9, then divide by 5, then add 32
    var num = parseFloat(value);
    num = num*9;
    num = num/5;
    num = num+32;
    return response.send({"unit":"fahrenheit","value":num});
  } else if (unit == 'fahrenheit') {
    //F to C
    //Deduct 32, then multiply by 5, then divide by 9
    var num = parseFloat(value);
    num = num-32;
    num = num*5;
    num = num/9;
    return response.send({"unit":"celsius","value":num});
  } else {
    return response.status(400).send();
  }
};

app.post("/", function(request, response) {
    console.log(request.body);
    if (request.body.unit === undefined || request.body.value === undefined) {
      return response.status(400).send();
    } else {
      return convert(request.body.unit, request.body.value, response);
    }
});
