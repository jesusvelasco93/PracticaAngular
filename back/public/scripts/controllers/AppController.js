angular.module("goldencrew").controller("AppController", ["$scope", "$location", "$window", "APIClientUsers", "LogUser", "paths", function($scope, $location, $window, APIClientUsers, LogUser, paths) {

    // Model init
    $scope.model = {
        title: "Golden Crew Parkour",
    };
    $scope.paths = paths;
    // $scope.state = "loading";

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
            $scope.$broadcast("loginError", err);
        });
        // $scope.$on("endLoading", function (event){
        //     $scope.state = "ideal";
        // });

        $scope.navegar = function (dir) {
            console.log(dir);
            if (dir !== ""){
                switch(dir) {
                case paths.facebook:
                    $window.open(paths.facebook);
                    break;
                case paths.youtube:
                    $window.open(paths.youtube);
                    break;
                }

            }
            
        };
}]);
