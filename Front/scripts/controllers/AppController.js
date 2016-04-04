angular.module("moviedb").controller("AppController",
    ["$scope", "$location", "paths", function ($scope, $location, paths){

        var controller = this;

        // Controller properties
        controller.titles = {}
        controller.titles[paths.movies] = "Movies List";
        controller.titles[paths.newMovie] = "New Movie";
        controller.titles[paths.series] = "Series List";
        controller.titles[paths.people] = "People List";

        // Model init
        $scope.model = {
            title: ""
        }

        // Scope event listeners
        $scope.$on("$locationChangeSuccess", function (evt, currentRoute){
            
            $scope.model.title = controller.titles[$location.path()] || "404 Not Found";

        });

        $scope.$on("ChangeTitle", function (evt, title){
            $scope.model.title = title;
        });
    }]
);