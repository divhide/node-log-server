
var _           = require('lodash'),
    fs          = require('fs'),
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
    .define('p','port', null, 'Port number')
    .define('d','dir', null, 'Logs directory');

var options = simpleargs(process.argv.slice(2));

/// validate the parameters
if(!options.port || !options.dir){
    console.log("Usage:");
    console.log();
    console.log("\t log-server -p PORT -d LOGSDIR");
    console.log();
    process.exit(1);
}

/// normalize options
options.dir = path.resolve(options.dir);


///
/// Initalize filesystem
///
if (!fs.existsSync(options.dir)){
    fs.mkdirSync(options.dir);
}

///
/// Initialize express
///

var app = express();

// parse text/plain
app.use(
    bodyParser.raw({ type: 'text/plain', limit: 1024 * 1024 * 10 }));

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
app.get('/*', serveIndex(options.dir, { icons: true, view: 'details' }));
app.get('/*.log', serveStatic(options.dir, { icons: true }));

/// Start server
app.listen(options.port);

///
/// Show somethin on stdout
///
console.log(
    _.template("http://localhost:<%= port %>", { port: options.port }));

console.log(
    _.template("Logs directory '<%= dir %>'", { dir: options.dir }));
