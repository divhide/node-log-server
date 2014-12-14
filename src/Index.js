
var _           = require('lodash'),
    path        = require('path'),
    express     = require('express'),
    bodyParser  = require('body-parser'),
    simpleargs  = require('simpleargs'),
    serveIndex  = require('serve-index'),
    serveStatic = require('serve-static'),
    Log         = require("./Log");

///
/// Process the arguments
///
simpleargs
    .define('p','port', 8000, 'Port number')
    .define('d','dir', __dirname, 'Logs directory');

var options = simpleargs(process.argv.slice(2));

///
/// Initialize express
///

var app = express();

// parse text/plain
app.use(
    bodyParser.raw({ type: 'text/plain', limit: 1024 * 1024 * 10 }));

app.engine('html', require('swig').renderFile);

///
/// POST '/:id/log' - Log the request body into a file. Each request will appended
/// into a file.
///
app.post('/:id/log/', function(req, res){

    var logName = req.params.id;
    Log(options.dir, logName)
    .write(req.body)
    .then(function(){
        res.send();
    });

});

///
/// Get '/log' - Log the request body into a file. Each request will appended
/// into a file.
///
app.get('/', serveIndex(options.dir, {'icons': true}));
app.get('/*', serveStatic(options.dir, {'icons': true}));

app.listen(options.port);


///
/// Show somethin on stdout
///
console.log(
    _.template("http://localhost:<%= port %>", { port: options.port }));

console.log(
    _.template("Logs directory '<%= dir %>'", { dir: path.resolve(options.dir) }));
