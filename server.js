/*
 * Demo MEAN application using JWT authentication
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

var CONTACTS_COLLECTION = 'contacts';

var app = express();
app.use(express.static(__dirname + 'app'));
app.use(bodyParser.json());

// Global db object that uses the MongoDB collection pool 
var db;

// Connect to db before starting the app server
mongodb.MongoClient.connect(process.env.MONGOLAB_URI, function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Save db object from the database connection callback for reuse
    db = database;
    console.log('Database connection ready...');

    // Initialize the app
    var server = app.listen(process.env.PORT || 4343, function () {
        var port = server.address().port;
        console.log('App now running on PORT: ', port);
    });
});

// Express Routes (Public API)

// Handler for internal server errors
function errorHandler(err, request, response, next) {// 'next' is an Express function that we use to handler errors
    console.log('ERROR: ', err.message);
    console.log(err.stack);
    response.status( err.stack || 500).json({'error': err});
    //response.render('error_template', { error: err });// TODO: Provide a better interface 
}

app.use(errorHandler); 


