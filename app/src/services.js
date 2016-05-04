angular.module('contactsApp')
/*
 * @name services.js
 * @description
 * Contains the Angular client-side/front-end wrapper to
 * our Express back-end API endpoints provided by server.js
 *
 * ## client-side/front-end routing
 * ```js
 * this.getContacts = function () {
 *  return $http.get('/contacts').
 *      then(function (response) {
 *           return response;
 *       }, function (response) {
 *           alert('Error retrieving contacts.');
 *       });
 * }
 * ```
 *
 * ## server-side/back-end routing
 * ```js
 * app.get('/contacts', function (request, response) {
 *   db.collection(CONTACTS_COLLECTION).find({}).toArray(function (error, mongodocs) {
 *       if (error) {
 *           errorHandler(response, error.message, 'Failed to get contacts.');
 *       } else {
 *           response.status(200).json(mongodocs);
 *       }
 *   });
 * });
 * ```
 */
    .service('Contacts', function ($http) {
        this.getContacts = function () {
            return $http.get('/contacts').
                then(function (response) {
                    return response;
                }, function (response) {
                    alert('Error retrieving contacts.');
                });
        }
        this.createContact = function (contact) {
            return $http.post('/contacts', contact).
                then(function (response) {
                    return response;
                }, function (response) {
                    alert('Error creating contact.');
                });
        }
        this.getContact = function (contactId) {
            var url = '/contacts' + contactId;
            return $http.get(url).
                then(function (response) {
                    return response;
                }, function (response) {
                    alert('Error finding this contact.');
                });
        }
        this.editContact = function (contact) {
            var url = '/contacts' + contactId;
            console.log('editing contact id: ', contact._id);
            return $http.put(url,contact).
                then(function (response) {
                    return response;
                }, function (response) {
                    alert('Error editing this contact.');
                    console.log(response);
                });
        }
        this.deleteContact = function (contactId) {
            var url = '/contacts/' + contactId;
            return $http.delete(url).
                then(function (response) {
                    return response;
                }, function (response) {
                    alert('Error deleting this contact.');
                    console.log(response);
                });
        }
    });
