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
var getLogFilename = function(name){

    name = name || "default";

    /// calculate the log file name
    var date = new Date();
    return _.template(
        "<%= year %>-<%= month %>-<%= day %>_<%= filename %>.log",
        { year: date.getFullYear(), month: date.getMonth()+1, day: date.getDate(), filename: name });

};


/**
 *
 * Log file
 *
 * @param {String} name
 *
 */
var Log = function(name){

    /// get the log filename
    name = getLogFilename(name)

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