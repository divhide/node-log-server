"use strict";

var fs  = require("fs"),
    _   = require("lodash"),
    Q   = require("q");


/**
 *
 * Get the log file name
 *
 * @return {String}
 *
 */
var getLogDirectory = function(baseDir){

    if(!baseDir && typeof(baseDir)!="string" ){
        throw new Error("Base Log dir is required!");
    }

    /// calculate the log file name
    var date = new Date();
    var dirPath = _.template("<%= baseDir %>/<%= year %>-<%= month %>-<%= day %>")(
        { year: date.getFullYear(), month: date.getMonth()+1, day: date.getDate(), baseDir: baseDir });

    /// auto create directories
    if (!fs.existsSync(baseDir)){
        fs.mkdirSync(baseDir);
    }

    if (!fs.existsSync(dirPath)){
        fs.mkdirSync(dirPath);
    }

    return dirPath;

};

/**
 *
 * Get the log file name
 *
 * @return {String}
 *
 */
var getLogFilename = function(logdir, name){

    if(!name && typeof(name)!="string" ){
        throw new Error("Log name is required!");
    }

    /// calculate the log file name
    return _.template("<%= dir %>/<%= filename %>.log")({ dir: logdir, filename: name });

};


/**
 *
 * Log file
 *
 * @param {String} name
 *
 */
var Log = function(baseLogDir, name){

    /// get the base log dir
    baseLogDir = getLogDirectory(baseLogDir);

    /// get the log filename
    name = getLogFilename(baseLogDir, name);

    var self = {

        /**
         *
         * Write the buffer into the log file
         *
         * @param  {Buffer} buffer
         * @return {Promise}
         *
         */
        write: function(buffer){

            var dfd = Q.defer();

            fs.appendFile(name, buffer, function(err){
                if(err) dfd.reject(err);
                else    dfd.resolve();
            });

            return dfd.promise;

        }

    };

    return self;

};

module.exports = Log;
