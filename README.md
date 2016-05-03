# The Masters Tweets

### Pulls tweets from Twitter on the users favorite golfer

## Summary

#### Using AngularJS routes creates a single page app that will make AJAX request to the Twitter API about The Masters and the user can select a golfer from a drop down menue or enter their own hash request into the text box.
The app uses AngularJS, Angular Routes, Bootstrap, jquery along with CSS, HTML and native javascript.

### Author: Tristan Lobaugh 
+ Github - https://github.com/TristanLobaugh
+ Homepage - http://tristanlobaugh.com

## Demo

[Live Demo](http://tristanlobaugh.com/the_master_tweets)

## Screenshots

### Main page:
![alt text](https://raw.githubusercontent.com/TristanLobaugh/the_master_tweets/master/img/screen_shot.png)

### Bootstrap Navbar with Drop-down:
![alt text](https://raw.githubusercontent.com/TristanLobaugh/the_master_tweets/master/img/screen_shot2.png)

### Tweets:
![alt text](https://raw.githubusercontent.com/TristanLobaugh/the_master_tweets/master/img/screen_shot3.png)


##Code Examples

### AngularJS Routes provide a single page app
```
tweetApp.config(function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "pages/main.html",
        controller: "tweetController"
    });
    $routeProvider.when("/player/:miscPlayer", {
        templateUrl: "pages/player.html",
        controller: "tweetController"
    });
    $routeProvider.when("/search/:searchField", {
        templateUrl: "pages/search.html",
        controller: "tweetController"
    });
    $routeProvider.otherwise({
        redirectTo: "/"
    });
});
```

### Angular Controller used to make the api requestand then provide the data to the view
```
tweetApp.controller("tweetController", function($scope, $http, $routeParams, $interval) {
    var search = "AugustaNational";
    if ("miscPlayer" in $routeParams) {
        search = $routeParams.miscPlayer
    } else if ("searchField" in $routeParams) {
        search = $routeParams.searchField
    } else {
        search = "AugustaNational";
    }
    var url = "http://www.digitalcrafts.com/students/twitter/hashtag.php?hash=TheMasters&secondHash=" + search;
    $http.get(url).success(function(data) {
        $scope.data = data.statuses;
        for (var i = 0; i < $scope.data.length; i++) {
            var time = $scope.data[i].created_at;
            var tweetTime = new Date(time);
            $scope.data[i].tweetSeconds = tweetTime.getTime() / 1000;
            $interval(function() {
                for (var i = 0; i < $scope.data.length; i++) {
                    var currentDate = new Date();
                    var currentTimeInSeconds = currentDate.getTime() / 1000;
                    $scope.data[i].sinceTweeted = Math.floor((currentTimeInSeconds - $scope.data[i].tweetSeconds) / 60);
                };
            }, 1000);
        }
    });
});
```

## To Do