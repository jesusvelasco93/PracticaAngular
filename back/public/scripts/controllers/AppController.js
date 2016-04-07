angular.module("goldencrew").controller("AppController", ["$scope", "$location", "APIClientUsers", "LogUser", "paths", function($scope, $location, APIClientUsers, LogUser, paths) {

    // Model init
    $scope.model = {
        title: "Golden Crew Parkour"
    };
    var namePage = "Golden Crew Parkour"
    var controller = this;
        controller.titles = {}
        // controller.titles[paths.home] = "VideoClub";
        controller.titles[paths.articles] = "Articles";        
        controller.titles[paths.articleNew] = "New Article";
        controller.titles[paths.login] = "Login";
        

        //scope event listeners:
        $scope.$on("$locationChangeSuccess", function(evt, currentRoute) {
            $scope.model.title = namePage + " - " + controller.titles[$location.path()] || namePage + "404 Not Found";
        });

        $scope.$on("viewMovie", function (event, data) {
            $scope.model.title = data;
        });

        $scope.$on("loginErrorEmit", function (event, err) {
            console.log("broadcast", err);
            $scope.$broadcast("loginError", err);
        });

}]);
