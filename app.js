(function(){

var demoApp=angular.module('demoApp',['ngRoute']);

demoApp.config(function ($routeProvider){
	$routeProvider
	.when('/',
	{
		controller:'SimpleController',
		templateUrl:'Partials/index.html'
		})
	.when('/index1',
	{
		controller:'SimpleController',
		templateUrl:'Partials/index1.html'
		})
	.when('/index2',
	{
		controller:'SimpleController',
		templateUrl:'Partials/index2.html'
		})
	.when('/index3',
	{
		controller:'SimpleController',
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
    userService.Changeval = function (value) {

       userService.valid = true;
    };

    return userService;
});

demoApp.controller('SimpleController',['$scope','$location','$http','UserService', function($scope, $location,$http,UserService){
	
	var availPins = [600036, 673638];
	var count=0;
	
	$scope.update=function()
	{
	
		var isTrue = false;
		console.log('Fn is called');
		UserService.ChangeName($scope.pin);

		for (var i = availPins.length - 1; i >= 0; i--) {
			if (availPins[i] == $scope.pin){
				console.log('Correct you bitch');
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
		UserService.Changeval();
	}

	$scope.check=function()
	{
		$location.path('/'+'index2');
	}
	

	$scope.register=function()
	{
		count=UserService.pin;
		console.log({ pin: UserService.pin , email: UserService.email });
		var req = 
		{  	 method: 'POST',
			 url: '/test/api/getEmail.php', 
			 headers: { 'Content-Type':'application/x-www-form-urlencoded' },
			 data: $.param({ pin: UserService.pin , email: UserService.email }),
		 } 
		
		 $http(req)
		 .success(
		 	function(response){
		 		console.log(response);
		 		if (response.status == "success"){
		    			console.log("correct");
		    	}
		    	else if (response.status == "wrong_password"){
		    			console.log("Incorrect");
		    	} 
		    	else if (response.status == "no_user"){
		    			console.log("No User");
		    	}
		 	})
		 .error(
		 	function(response){
		 		console.log(response);
		 		  // called asynchronously if an error occurs
				    // or server returns response with an error status.
				    console.log("No Internet Connection");
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
		return UserService.getval;
	}
}]);
})();