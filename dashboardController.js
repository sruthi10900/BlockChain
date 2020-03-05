'use strict';
app.controller('dashboardCtrl',
    function ($scope, $rootScope, AuthenticationService) {
        $rootScope.isLoggedIn = false;

        $scope.logIn = function() {
            $scope.dataLoading = true;
            AuthenticationService.login($scope.username, $scope.password, function(response) {
                if(response.success) {
                    $rootScope.isLoggedIn = true;
                    AuthenticationService.setCredentials($scope.username, $scope.password);
                } else {
                    $scope.error = response.message;
                    alert(response.message);
                    $scope.dataLoading = false;
                }
            });
        };



    
            $scope.addProduct = function() {
                $scope.dataLoading = true;
                AuthenticationService.addProduct($scope.poid, $scope.shipTo, $scope.shipVia, $scope.itemType, $scope.qty, function(response){
                    if(response.success){
                        $rootScope.isSubmitted = true;
                        console.log("data entered");
                    }
                    else{
                        $scope.error = response.message;
                    alert(response.message);
                    $scope.dataLoading = false;
                    }
                })
            };
        
        

        $scope.logOut = function() {
            $rootScope.isLoggedIn = false;
            AuthenticationService.clearCredentials();
        }
});

