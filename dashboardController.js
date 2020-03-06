'use strict';
app.controller('dashboardCtrl',
    function ($scope, $rootScope, AuthenticationService) {
        $rootScope.isLoggedIn = false;
var packingLabelList ;
        $scope.logIn = function () {
            $scope.dataLoading = true;
            AuthenticationService.login($scope.username, $scope.password, function (response) {
                console.log(response)
                if (response.data.status == "success") {
                    $rootScope.isusaid = true;
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

        $scope.register = function(){
            $rootScope.isRegister = true;
           
        }

        $scope.submit = function(){
            $rootScope.isRegister = true;
            AuthenticationService.register($scope.fname, $scope.lname, $scope.username, $scope.password,function(response){
                console.log(response);
                if (response.status == 200) {
                    
                    $rootScope.isLoggedIn = false;
                    $rootScope.isRegister=false;
                    // AuthenticationService.setCredentials($scope.username, $scope.password);
                } else {
                    $scope.error = response.message;
                    alert("Registration Failed");
                    $scope.dataLoading = false;
                }
            }
            );
        }


        $scope.logInTransport = function () {
            console.log("helloo");
            $scope.dataLoading = true;
            AuthenticationService.loginTransport($scope.username, $scope.password, function (response) {
                console.log(response)
                if (response.data.status == "success") {
                    $rootScope.isTransport = true;
                    $rootScope.isLoggedIn = true;
                    $rootScope.token = response.data.token
                    console.log($rootScope.token);
                    // AuthenticationService.setCredentials($scope.username, $scope.password);
                    
                } else {
                    $scope.error = response.message;
                    alert("Invalid creds");
                    $scope.dataLoading = false;
                }
            });
        };

        $scope.logInWarehouse = function () {
            console.log("helloo");
            $scope.dataLoading = true;
            AuthenticationService.loginWarehouse($scope.username, $scope.password, function (response) {
                console.log(response)
                if (response.data.status == "success") {
                    $rootScope.isTransport = true;
                    $rootScope.isLoggedIn = true;
                    $rootScope.token = response.data.token
                    console.log($rootScope.token);
                    // AuthenticationService.setCredentials($scope.username, $scope.password);
                    
                } else {
                    $scope.error = response.message;
                    alert("Invalid creds");
                    $scope.dataLoading = false;
                }
            });
        };

        $scope.fetchDetails = function(){
            AuthenticationService.fetchDetails($scope.packingLabelList,function(response){
                
                console.log(response);
                if(response.success){
                    console.log(response);
                    $rootScope.fetched = true;
                    $rootScope.processed=false;
                    $scope.transportChecklist = response.data;
                    $rootScope.recieved = false;
                }
                if(response.message == "Already Processed"){
                    $rootScope.processed = true;
                }
                if(response.message == "cannot Process at the moment"){
                    $rootScope.recieved = true;
                }
            })
        }


        $scope.fetchDetailsWarehouse = function(){
            AuthenticationService.fetchDetailsWarehouse($scope.packingLabelList,function(response){
                
                console.log(response);
                if(response.success){
                    console.log(response);
                    $rootScope.processed=false;
                    $rootScope.fetched = true;
                    $rootScope.recieved = false;
                    $scope.warehouseChecklist = response.data
                }
                if(response.message == "Already Processed"){
                    $rootScope.processed = true;
                }
                if(response.message == "cannot Process at the moment"){
                    $rootScope.recieved = true;
                }
            })
        }

        $scope.addProduct = function () {
            $scope.dataLoading = true;
            AuthenticationService.addProduct($scope.packingLabelList, $scope.shipTo, $scope.shipVia, $scope.itemType, $scope.qty, function (response) {
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


        $scope.recievedTransport = function () {
            $scope.dataLoading = true;
            console.log("jekj");
            AuthenticationService.recievedTransport($scope.packingLabelList,function (response) {
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


        
        $scope.recievedWarehouse = function () {
            $scope.dataLoading = true;
            console.log("jekj");
            AuthenticationService.recievedWarehouse($scope.packingLabelList,function (response) {
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