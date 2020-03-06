'use strict';
app.service('NgoService',['$http', '$cookies', '$rootScope', function($http, $cookies, $rootScope){
    
        var service = {};
        service.addProduct = function(packingLabelList, shipTo, callback) {
            var parameter = JSON.stringify({
                "peers":["peer0.machine1.ngo.example.com"],
                "fcn":"insertAsset",
                "args":[packingLabelList,"Digital Vibes","12/02/2020",shipTo,"NGOTo","Null","MTransports","Null","1 day","13/02/2020",
                "1","Mattress","1","15","17","15","2","Null","Null","None","Submitted"]
                });


            $http.post('http://34.95.28.214:4000/channels/commonchannel/chaincodes/po2contract', parameter).then(function(response) {
                // First function handles success
                // $scope.content = response.data;
                console.log(response.data);
                console.log(response.data.success);
               
                
              });
        }
    
}]
);