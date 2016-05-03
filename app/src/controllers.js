angular.module('contactsApp')

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
    