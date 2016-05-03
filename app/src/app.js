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
    .when('contact/:contactId', {
        controller: 'EditContactController',
        templateUrl: 'contact.html'
    })
    .otherwise({
        redirectTo: '/'
    });
