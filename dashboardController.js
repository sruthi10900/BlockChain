'use strict';
app.controller('dashboardCtrl',
    function ($scope, $rootScope, AuthenticationService) {
        $rootScope.isLoggedIn = false;

        $scope.logIn = function () {
            $scope.dataLoading = true;
            AuthenticationService.login($scope.username, $scope.password, function (response) {
                console.log(response)
                if (response.data.status == "success") {
                    $rootScope.isLoggedIn = true;
                    $rootScope.token = response.data.token
                    // AuthenticationService.setCredentials($scope.username, $scope.password);
                } else {
                    $scope.error = response.message;
                    alert("Invalid creds");
                    $scope.dataLoading = false;
                }
            });
        };

        $scope.addProduct = function () {
            $scope.dataLoading = true;
            AuthenticationService.addProduct($scope.poid, $scope.shipTo, $scope.shipVia, $scope.itemType, $scope.qty, function (response) {
                if (response.success) {
                    $rootScope.isSubmitted = true;
                    console.log("data entered");
                } else {
                    $scope.error = response.message;
                    alert(response.message);
                    $scope.dataLoading = false;
                }
            })
        };



        $scope.logOut = function () {
            $rootScope.isLoggedIn = false;
            $rootScope.token= null;
        }
    });