(function(){

var demoApp=angular.module('demoApp',['ngRoute']);

demoApp.config(function ($routeProvider){
	$routeProvider
	.when('/',
	{
		controller:'PinController',
		templateUrl:'Partials/index.html'
		})
	.when('/index1',
	{
		controller:'PinController',
		templateUrl:'Partials/index1.html'
		})
	.when('/index2',
	{
		controller:'PinController',
		templateUrl:'Partials/index2.html'
		})
	.when('/index3',
	{
		controller:'VendorController',
		templateUrl:'Partials/index3.html'
		})
	.otherwise({ redirectTo:'/index.html'});
});
demoApp.factory('UserService', function() {
    var userService = {};

    userService.pin =600036;
    userService.email='aqel@gmail.com';
    userService.valid=false;

    userService.ChangeName = function (value) {

       userService.pin = value;
    };
	userService.ChangeEmail = function (value) {

       userService.email = value;
    };
    userService.Changeval = function () {

       userService.valid = true;
    };

    return userService;
});


demoApp.controller('PinController',['$scope','$location','$http','UserService', function($scope, $location,$http,UserService){
	
	var availPins = [600036, 673638];
	var count=0;
	
	$scope.update=function()
	{
	
		var isTrue = false;
		UserService.ChangeName($scope.pin);

		for (var i = availPins.length - 1; i >= 0; i--) {
			if (availPins[i] == $scope.pin){

				isTrue = true;
			}
		};
	
		if (isTrue){
			$location.path('/'+'index3');
		}else{
			$location.path('/'+'index1');		
		}
		return count;
	};

	$scope.pass=function()
	{
		UserService.ChangeEmail($scope.email);
		
	}

	$scope.check=function()
	{
		$location.path('/'+'index2');
		
	}
	
	

	
	$scope.register=function()
	{
		count=UserService.pin;
		UserService.Changeval();
		var req = 
		{  	 method: 'POST',
			 url: 'api/getEmail.php', 
			 headers: { 'Content-Type':'application/x-www-form-urlencoded' },
			 data: $.param({ pin: UserService.pin , email: UserService.email }),
		 } 
		
		 $http(req)
		 .success(
		 	function(response){
		 		
		 	})
		 .error(
		 	function(response){
		 		
		 	});
		 $scope.check();
	}

	$scope.getPin=function()
	{
		return UserService.pin;
	}
	$scope.getEmail=function()
	{
		return UserService.email;
	}
	$scope.getval=function()
	{
		return UserService.valid;
	}
}]);

demoApp.controller('VendorController',['$scope','$location','$http','UserService', function($scope, $location,$http,UserService){
function myFunc(){
			var toBeSendData = $.param({pin : UserService.pin });
				$http({
		    		method: 'POST', 
		    		url: 'api/getMyVendors.php',
		    		data:  toBeSendData,
		    		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			    }).
			  	success(function(response) {
		    		$scope.vendors = response.data;
		    		return response;
		  		}).
		 		error(function(response) {
		  		});
		};

		$scope.vendors = myFunc();
}]);
})();
