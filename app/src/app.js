/*
 * app.js
 *
 * Contains the angular logic for the app.
 */ 
angular.module('contactsApp', ['ngRoute'])
    .config(function($routeProvider)) {
        $routeProvider
        .when('/', {
            templateUrl: 'list.html',
            controller: 'ListController',
            resolve: {
                contacts: function(Contacts) {
                    return Contacts.getContacts();
                }
            }
        })
    }
    .when('new/contact', {
        controller: 'NewContactController',
        templateUrl: 'contact-form.html'
    })
    .service('Contacts', function($http) {
        this.getContacts = function() {
            return $http.get('/contacts').
                then(function (response) {
                    return response;
                }), function (response) {
                    alert('Error retrieving contacts.');
                }
        }
    })
    .controller('ListController', function(contacts, $scope) {
        $scope.contacts = contacts.data;
    });
