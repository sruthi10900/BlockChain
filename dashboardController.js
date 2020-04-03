'use strict';
app.controller('dashboardCtrl',
    function ($scope, $rootScope, $timeout, AuthenticationService) {
        $rootScope.isLoggedIn = false;
        var packingLabelList;
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

        $scope.register = function () {
            $rootScope.isRegister = true;

        }




        $scope.submit = function () {
            $rootScope.isRegister = true;
            AuthenticationService.register($scope.fname, $scope.lname, $scope.username, $scope.password, function (response) {
                console.log(response);
                if (response.status == 200) {

                    $rootScope.isLoggedIn = false;
                    $rootScope.isRegister = false;
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

        $scope.logInSupplier = function () {
            console.log("helloo");
            $scope.dataLoading = true;
            AuthenticationService.loginSupplier($scope.username, $scope.password, function (response) {
                console.log(response)
                if (response.data.status == "success") {
                    $rootScope.isSupplier = true;
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

   

        $scope.fetchDetails = function () {
            $scope.selection = [];
            AuthenticationService.fetchDetails($scope.packingLabelList, function (response) {

                console.log(response);
                if (response.message == "Already Processed") {
                    $rootScope.processed = true;
                    $rootScope.fetched = false;
                    alert("Already Processed");
                    $scope.dataLoading = false;
                }
               else if (response.message == "cannot Process at the moment") {
                    $rootScope.recieved = true;
                    $rootScope.fetched = false;
                    alert("cannot Process at the moment");
                    $scope.dataLoading = false;
                }
               else if (response.success) {
                    console.log(response);
                    $rootScope.fetched = true;
                    $rootScope.processed = false;
                    $scope.transportChecklist = response.data;
                    $scope.productList = JSON.parse(response.data.ProductName);
                    $rootScope.recieved = false;
                }
               
            })
        }


        $scope.fetchDetailsWarehouse = function () {
            $scope.selection = [];
            AuthenticationService.fetchDetailsWarehouse($scope.packingLabelList, function (response) {

                console.log(response);
                if (response.message == "Already Processed") {
                    $rootScope.processed = true;
                    $rootScope.fetched = false;
                    alert("Already Processed");
                    $scope.dataLoading = false;
                }
                else if (response.message == "cannot Process at the moment") {
                    $rootScope.recieved = true;
                    $rootScope.fetched = false;
                    alert("cannot Process at the moment");
                    $scope.dataLoading = false;
                }
                else if (response.success) {
                    console.log(response);
                    $rootScope.processed = false;
                    $rootScope.fetched = true;
                    $rootScope.recieved = false;
                    $scope.warehouseChecklist = response.data;
                    $scope.productList = JSON.parse(response.data.ProductName);
                }
                
            })
        }

        $scope.fetchDetailsSupplier = function () {
            $scope.selection = [];
            AuthenticationService.fetchDetailsSupplier($scope.packingLabelList, function (response) {

                console.log(response);
                if (response.message == "Already Processed") {
                    $rootScope.processed = true;
                    $rootScope.fetched = false;
                    alert("Already Processed");
                    $scope.dataLoading = false;
                }
                else if (response.message == "cannot Process at the moment") {
                    $rootScope.recieved = true;
                    $rootScope.fetched = false;
                    alert("cannot Process at the moment");
                    $scope.dataLoading = false;
                }
               else if (response.success) {
                    console.log(response);
                    $rootScope.processed = false;
                    $rootScope.fetched = true;
                    $rootScope.recieved = false;
                    $scope.supplierChecklist = response.data
                    $scope.productList = JSON.parse(response.data.ProductName);

                }
                
            })
        }

        $scope.fetchDetailsNGO = function () {

            fetchNGO();
        };

        function fetchNGO() {
            $scope.selection = [];
            AuthenticationService.fetchDetailsSupplier($scope.packingLabelList, function (response) {

                console.log(response);
                if (response.success) {
                    console.log(response);
                    $rootScope.fetched = true;
                    $scope.supplierChecklist = response.data
                }
                $scope.time = 0;


                $timeout(function() {callAtTimeout(response)}, 5000);

            });
            function callAtTimeout(response) {

                if (response.message == "cannot Process at the moment") {
               

                    document.getElementById("USAID").className = "active";
                  

                }

                if (response.data.Status == "Submitted") {

                    document.getElementById("USAID").className = "done";
                    document.getElementById("NGO").className = "active";
                  

                }
                else if (response.data.Status == "Recievd  to Supplier") {
                    $rootScope.processed = true;
                    document.getElementById("USAID").className = "done";
                    document.getElementById("NGO").className = "done";
                    document.getElementById("Supplier").className = "active";


                }

                else if (response.data.Status == "Recievd  to Transporter") {
                    $rootScope.processed = true;
                    document.getElementById("USAID").className = "done";
                    document.getElementById("NGO").className = "done";
                    document.getElementById("Supplier").className = "done";
                    document.getElementById("Transporter").className = "active";
                }
                else if (response.data.Status == "Recievd  to Warehouse") {
                    $rootScope.processed = true;
                    document.getElementById("USAID").className = "done";
                    document.getElementById("NGO").className = "done";
                    document.getElementById("Supplier").className = "done";
                    document.getElementById("Transporter").className = "done";
                    document.getElementById("Warehouse").className = "active";
                }

                else if (response.data.Status == "Recievd  to Supplier with Items Missing") {
                    $rootScope.processed = true;
                    document.getElementById("USAID").className = "done";
                    document.getElementById("NGO").className = "done";
                    document.getElementById("Supplier").className = "error";
                }

                else if (response.data.Status == "Recievd  to Transporter with Items Missing") {
                    $rootScope.processed = true;
                    document.getElementById("USAID").className = "done";
                    document.getElementById("NGO").className = "done";
                    document.getElementById("Supplier").className = "done";
                    document.getElementById("Transporter").className = "error";
                }

                else if (response.data.Status == "Recievd  to Warehouse with Items Missing") {
                    $rootScope.processed = true;
                    document.getElementById("USAID").className = "done";
                    document.getElementById("NGO").className = "done";
                    document.getElementById("Supplier").className = "done";
                    document.getElementById("Transporter").className = "done";
                    document.getElementById("Warehouse").className = "error";
                }

                fetchNGO();

            }
        }









        $scope.addProduct = function () {
            $scope.dataLoading = true;
            AuthenticationService.addProduct($scope.packingLabelList, $scope.shipTo, $scope.shipVia, $scope.itemType, $scope.qty,$scope.price, function (response) {
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
            if($scope.selection.length== $scope.productList.length){
                sel = true;
            }
            AuthenticationService.recievedTransport($scope.packingLabelList,sel,function (response) {
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


        var sel;
        $scope.recievedWarehouse = function () {
            $scope.dataLoading = true;
            if($scope.selection.length== $scope.productList.length){
                sel = true;
            }
            AuthenticationService.recievedWarehouse($scope.packingLabelList,sel, function (response) {
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

       
        $scope.toggleSelection = function toggleSelection(product) {
        
            var idx = $scope.selection.indexOf(product);
        
            // Is currently selected
            if (idx > -1) {
              $scope.selection.splice(idx, 1);
            }
        
            // Is newly selected
            else {
              $scope.selection.push(product);
            }
          };

        $scope.recievedSupplier = function () {
            $scope.dataLoading = true;
         

            if($scope.selection.length== $scope.productList.length){
                sel = true;
            }

            AuthenticationService.recievedSupplier($scope.packingLabelList,sel, function (response) {
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


        $scope.submitOrder = function() {
            $rootScope.isSubmitted = true;
        }


        $scope.logOut = function () {
            $rootScope.isLoggedIn = false;
            $rootScope.token = null;
        }
    });