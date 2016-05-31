angular.module('projectApp')

/**
 *
 * App Controller logic
 *
 */

    .controller('ListController', function(contacts, $scope) {
        $scope.contacts = contacts.data;
    })
    .controller('NewContactController', function($scope, $location, Contacts) {
        $scope.back = function () {
            $location.path('#/');
        }

        $scope.saveContact = function (contact) {
            Contacts.createContact(contact).
                then(function (doc) {
                    var contactUrl = '/contact' + doc.data._id;
                    $location.path(contactUrl);
                }, function (response) {
                    alert(response);
                });
        }
    })
    .controller('EditContactController', function($scope, $routeParams, Contacts) {
        Contacts.getContact($routeParams.contactId).
            then(function (doc) {
                $scope.contact = doc.data;
            }, function (response) {
                alert(response);
            });

        $scope.toggleEdit = function () {
            $scope.editMode = true;
            $scope.contactFormUrl = 'contact-form.html';
        }

        $scope.back = function () {
            $scope.editMode = false;
            $scope.contactFormUrl = '';
        }

        $scope.saveContact = function (contact) {
            Contacts.editContact(contact);
            $scope.editMode = false;
            $scope.contactFormUrl = '';
        }

        $scope.deleteContact = function (contactId) {
            Contacts.deleteContact(contactId);
        }
    });

