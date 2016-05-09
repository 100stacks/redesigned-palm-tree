/*
 * app.js
 *
 * Contains the angular route logic for the app.
 */ 
angular.module('projectApp', ['ngRoute'])

    // From medium.com/@hackstate tip to improve Angular performace...not really needed here more for documenting it.
    .config(['$compileProvider', function ($compileProvider) {
        $compileProvider.debugInfoEnabled(false);
    }]);

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
