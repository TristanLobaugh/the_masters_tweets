var tweetApp = angular.module("tweetApp", ["ngRoute"]);

tweetApp.config(function($routeProvider){
	$routeProvider.when("/",{
		templateUrl: "pages/main.html",
		controller: "tweetController"
	});
	$routeProvider.when("/#/player",{
		templateUrl: "pages/player.html",
		controller: "playerController"
	});
	$routeProvider.when("/#/search",{
		templateUrl: "pages/search.html",
		controller: "searchController"
	});
});

tweetApp.controller("tweetController", function($scope, $http, $routeParams, $interval){
	var url = "http://www.digitalcrafts.com/students/twitter/hashtag.php?hash=TheMasters&secondHash=AugustaNational";
	$http.get(url).success(function(data){
		console.log(data.statuses);
		$scope.data = data.statuses;
		for(var i = 0; i < $scope.data.length; i++){
			var time = $scope.data[i].created_at;
			var tweetTime = new Date(time);
			$scope.data[i].tweetSeconds = tweetTime.getTime()/1000;
			console.log(tweetTime);
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

tweetApp.controller("playerController", function($scope, $http, $routeParams, $interval){
	var url = "http://www.digitalcrafts.com/students/twitter/hashtag.php?hash=TheMasters&secondHash=" + playerChosen;
	$http.get(url).success(function(data){
		console.log(data.statuses);
		$scope.data = data.statuses;
		for(var i = 0; i < $scope.data.length; i++){
			var time = $scope.data[i].created_at;
			var tweetTime = new Date(time);
			$scope.data[i].tweetSeconds = tweetTime.getTime()/1000;
			console.log(tweetTime);
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

tweetApp.controller("searchController", function($scope, $http, $routeParams, $interval){
	var url = "http://www.digitalcrafts.com/students/twitter/hashtag.php?hash=TheMasters&secondHash=" + searchField;
	$http.get(url).success(function(data){
		console.log(data.statuses);
		$scope.data = data.statuses;
		for(var i = 0; i < $scope.data.length; i++){
			var time = $scope.data[i].created_at;
			var tweetTime = new Date(time);
			$scope.data[i].tweetSeconds = tweetTime.getTime()/1000;
			console.log(tweetTime);
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

