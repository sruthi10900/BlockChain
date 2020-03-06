'use strict';

app.service('AuthenticationService',['$http', '$cookies', '$rootScope', 
    function($http, $cookies, $rootScope){
        var service = {};
        var accessToken ='';

        service.login = function(username, password, callback) {
            var parms = {username, password}
            $http.post("http://localhost:5000/api/authenticate", JSON.stringify(parms)).then(function(response){
                callback(response);
            });
        };

        service.loginTransport = function(username, password, callback) {
            var parms = {username, password}
            $http.post("http://localhost:5000/api/authenticatetransport", JSON.stringify(parms)).then(function(response){
                callback(response);
            });

            service.loginWarehouse = function(username, password, callback) {
                var parms = {username, password}
                $http.post("http://localhost:5000/api/authenticatewarehouse", JSON.stringify(parms)).then(function(response){
                    callback(response);
                });
           

           
            // $http.get("http://34.95.15.17:4000/channels/commonchannel/chaincodes/po2contract?fcn=read&peer=peer0.machine1.transporter.example.com&args=[\'909\']", config).then(function(response){
            //     callback(response);
            // });

        };

        service.fetchDetails = function(poid,callback){
            var success = false;
            var message = "Submit Failed";
            var config = {
                headers: {
                  'Authorization': 'Bearer '+$rootScope.token
                }
              };
              var x = poid.toString();
            $http.get("http://34.95.15.17:4000/channels/commonchannel/chaincodes/po2contract?fcn=read&peer=peer0.machine1.transporter.example.com&args=[\""+x+"\"]", config).then(function(response){
                if(response.status == 200){
                    console.log(response);
                success = true;
                message = "Submit succes";
                callback({success: success, message: message});
                }
                else{
                    callback({success: false, message: "Submit Failed"});
                }
            });
        }

        service.register = function(fname,lname,username,password,callback){
            var parms = {fname,lname,username, password}
            
            $http.post("http://localhost:5000/api/register", JSON.stringify(parms)).then(function(response){
                callback(response);
            });
        };
        // service.setCredentials = function(username, password) {
        //     var authdata = btoa(username + ':' + password);*
 
        //     $rootScope.globals = {
        //         currentUser: {
        //             username: username,
        //             authdata: authdata
        //         }
        //     };
            
        //     // Use this header for consquent rest call
        //     $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
        //     // $cookies.put('globals', $rootScope.globals);
        // };

        // service.clearCredentials = function(username, password) {
        //     $rootScope.token = null;
        //     // $cookies.remove('globals');
        //     // $http.defaults.headers.common.Authorization = 'Basic ';
        // };

        service.addProduct = function(poid,shipTo,shipVia,itemType,quantity,callback){
            var success = false;
            var message = "Submit Failed";
            var config = {
                headers: {
                  'Authorization': 'Bearer '+$rootScope.token
                }
              };
            var parameter = JSON.stringify({
                "peers":["peer0.machine1.ngo.example.com"],
                "fcn":"insertAsset",
                "args":[poid,"Digital Vibes","12/02/2020",shipTo,"NGOTo",shipVia,"MTransports","Null","1 day","13/02/2020",
                "1",itemType,quantity,"15","17","15","2","Null","Null","None","Submitted"]
                });


            $http.post('http://34.95.28.214:4000/channels/commonchannel/chaincodes/po2contract', parameter,config).then(function(response) {
                // First function handles success
                // $scope.content = response.data;
                console.log(response);
                if(response.data.success){
                    console.log(response.data.success);
                success = true;
                message = "Submit succes";
                callback({success: success, message: message});
                }
                else{
                    callback({success: false, message: "Submit Failed"});
                }
              });
        }


        service.recievedTransport = function(poid,callback){
            var success = false;
            var message = "Submit Failed";
            var config = {
                headers: {
                  'Authorization': 'Bearer '+$rootScope.token
                }
              };
            var parameter = JSON.stringify({
                
	
                    "peer":["peer0.machine1.transporter.example.com"],
                    "fcn":"updateAssetStatus",
                    "args":[poid,"Recievd  to Transporter"]
    });


            $http.post('http://34.95.15.17:4000/channels/commonchannel/chaincodes/po2contract', parameter,config).then(function(response) {
                // First function handles success
                // $scope.content = response.data;
                console.log(response);
                if(response.data.success){
                    console.log(response.data.success);
                success = true;
                message = "Submit succes";
                callback({success: success, message: message});
                }
                else{
                    callback({success: false, message: "Submit Failed"});
                }
              });
        }

    return service;
    }

    
   
]);





// User $http to do a rest call
            /*var parameter = JSON.stringify({type:"user", username : username,
            "orgName" : "USAID",
            "role":"client",
            "attrs":[
            {
            
            "name" :"isadmin",
            "value":"true",
            "ecert":true
            }
            ],
            "secret":"48b8ae9a8df990399a936103ca5f0159"});
            $http.post('http://34.95.28.214:4000/users/register', parameter).then(function(response) {
                // First function handles success
                // $scope.content = response.data;
                console.log(response.data);
                console.log(response.data.success);
                if(response.data.success){
                    console.log(response.data.success);
                success = true;
                message = "Login succes";
                accessToken = response.data.token;
                console.log(accessToken);
                callback({success: success, message: message});
                }
                else{
                    callback({success: false, message: "Wrong Password"});
                }
                
              });*/