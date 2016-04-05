var tweetApp = angular.module("tweetApp", ["ngRoute"]);
tweetApp.controller("tweetController", function($scope, $http, $routeParams, $interval){

	$scope.message = "Hello Wrold";
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