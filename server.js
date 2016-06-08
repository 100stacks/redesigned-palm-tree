/*
 * MEAN Stack application using JWT authentication
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
var dbConnectStr = process.env.MONGOLAB_URI;

// Connect to db before starting the app server
mongodb.MongoClient.connect(dbConnectStr, function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Save to global db object from the database connection callback for reuse
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

/*
 * Route - /contacts
 *
 * GET: finds all contacts
 * POST: creates a new contact
 */
app.get('/contacts', function (request, response) {
    db.collection(CONTACTS_COLLECTION).find({}).toArray(function (error, mongodocs) {
        if (error) {
            errorHandler(response, error.message, 'Failed to get contacts.');
        } else {
            response.status(200).json(mongodocs);
        }
    });
});

app.post('/contacts', function (request, response) {
    var newContact = request.body;
    newContact.createDate = new Date();

    if (!(request.body.firstName || request.body.lastName)) {
        errorHandler(response, 'Invalid user input', 'Must provide a first or last name.', 400);
    }

    db.collection(CONTACTS_COLLECTION).insertOne(newContact, function (error, mongodocs) {
        if (error) {
            errorHandler(response, error.mesage, 'Failed to create a new contact information.');
        } else {
            response.status(201).json(mongodocs.ops[0]);
        }
    });
});

/*
 * Route - /contacts/:id
 *
 * GET: find contact by ID
 * PUT: update contact by ID
 * DELETE: deletes contact by ID
 */
app.get('/contacts/:id', function (request, response) {
    db.collection(CONTACTS_COLLECTION).findOne({ _id: new ObjectID(request.params.id) },
        function (error, mongodoc) {
            if (error) {
                errorHandler(response, error.message, 'Failed to get contact information.');
            } else {
                response.status(200).json(mongodoc);
            }
        });
});

app.put('/contacts/:id', function (request, response) {
    var updateDoc = request.body;
    delete update._id;

    db.collection(CONTACTS_COLLECTION).updateOne( { _id: new ObjectID(request.params.id) }, updateDoc,
        function (error, mongodoc) {
            if (error) {
                errorHandler(response, error.message, 'Failed to update contact information.');
            } else {
                response.status(204).end()
            }
        }
    );
});

app.delete('/contacts/:id', function (request, response) {
    db.collection(CONTACTS_COLLECTION).deleteOne({ _id: new ObjectID(request.params.id)}, function(error, result) {
        if (error) {
            errorHandler(response, error.message, 'Failed to delete contact information.');
        } else {
            response.status(204).end();
        }
    });
});
