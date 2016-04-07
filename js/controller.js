var tweetApp = angular.module("tweetApp", ["ngRoute"]);

tweetApp.config(function($routeProvider){
	$routeProvider.when("/",{
		templateUrl: "pages/main.html",
		controller: "tweetController"
	});
	$routeProvider.when("/player/:miscPlayer",{
		templateUrl: "pages/player.html",
		controller: "tweetController"
	});
	$routeProvider.when("/search/:searchField",{
		templateUrl: "pages/search.html",
		controller: "tweetController"
	});
	$routeProvider.otherwise({
		redirectTo: "/"		
	});
});

tweetApp.controller("mainController", function($scope, $http, $routeParams, $interval, $location){
	$scope.header = "The Masters Tweets"
	$scope.changeHeader = function(name){
		$scope.header = name;
	}
	$scope.goSearch = function(){
		var loc="search/" + $scope.searchFor;
		$scope.header = $scope.searchFor;
		$location.path(loc);
		$scope.searchFor = "";
	}
});

tweetApp.controller("tweetController", function($scope, $http, $routeParams, $interval){
	var search = "AugustaNational";
	if("miscPlayer" in $routeParams){
		search = $routeParams.miscPlayer
	}else if("searchField" in $routeParams){
		search = $routeParams.searchField
	}
	else{
		search = "AugustaNational";
	}
	var url = "http://www.digitalcrafts.com/students/twitter/hashtag.php?hash=TheMasters&secondHash=" + search;
	$http.get(url).success(function(data){
		$scope.data = data.statuses;
		for(var i = 0; i < $scope.data.length; i++){
			var time = $scope.data[i].created_at;
			var tweetTime = new Date(time);
			$scope.data[i].tweetSeconds = tweetTime.getTime()/1000;
			$interval(function(){
				for(var i = 0; i < $scope.data.length; i++){
					var currentDate = new Date();
					var currentTimeInSeconds = currentDate.getTime()/1000;
					$scope.data[i].sinceTweeted = Math.floor((currentTimeInSeconds - $scope.data[i].tweetSeconds)/60);
				};
			}, 1000);
		}
	});
});
