
var express     = require('express'),
    bodyParser  = require('body-parser'),
    simpleargs  = require('simpleargs'),
    Log         = require("./Log");

simpleargs
    .define('p','port', 8000, 'Port number');

var options = simpleargs(process.argv.slice(2));

var app = express();

// parse text/plain
app.use(
    bodyParser.raw({ type: 'text/plain', limit: 1024 * 1024 * 10 }));

///
/// POST '/log' - Log the request body into a file. Each request will appended
/// into a file.
///
app.post('/log', function(req, res){

    Log("test")
    .write(req.body)
    .then(function(){
        res.send();
    });

});

app.listen(options.port);