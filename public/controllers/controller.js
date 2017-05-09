
var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Controller Initiated.");

    var refresh = function(){
        $http.get('/contactList').then(
            function(success){
                console.log('Data Fetched.');
                $scope.contactList = success.data;
                $scope.contact = null;
            }, 
            function(error){
                console.log(error);
            }
        );
    };

    refresh();

    $scope.addContactToggle = true;

    $scope.addContact = function(){
        console.log($scope.contact);

        $http.post('/contactList', $scope.contact).then(
            function(success){
                console.log(success);
                refresh();
            },
            function(error){
                console.log(error);
            }
        );
    };

    $scope.remove = function(id){
        
        $http.delete('/contactList/' + id)
        .then(
            function(success){
                console.log(success);
                refresh();
            },
            function(error){
                console.log(error);
            }
        );

    };

    $scope.edit = function(id){
        $scope.addContactToggle = false;
        $http.get('/contactList/' + id).then(
            function(success){
                console.log(success);
                $scope.contact = success.data;
            },
            function(error){
                console.log('Error: ', error);
            }
        );
    };

    $scope.update = function(){
        console.log($scope.contact._id);
        $http.put('/contactList/' + $scope.contact._id, $scope.contact)
        .then(
            function(success){
                refresh();
            },
            function(error){
                console.log('Error: ', error);
            }
        );

    };

    $scope.deselect = function()
    {
        $scope.contact = null;
        $scope.addContactToggle = true;
    }

}]);
