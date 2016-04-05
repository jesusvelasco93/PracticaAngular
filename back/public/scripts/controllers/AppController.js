angular.module("goldencrew").controller("AppController",
    ["$scope", "$location", "paths", function ($scope, $location, paths){

        // Model init
        $scope.model = {
            title: "Golden Crew Parkour"
        };
    }]
);