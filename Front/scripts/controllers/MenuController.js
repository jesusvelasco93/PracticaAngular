
// En el módulo moviedb, defino el controlador
angular.module("moviedb").controller("MenuController", 
    ["$scope", "$location", "paths", function ($scope, $location, paths){


        // Scope init
        $scope.model = {
            selectedItem: paths.movies
        };
        $scope.paths = paths;

        // Scope methods


        $scope.getClassForItem = function(item){
            if ($scope.model.selectedItem == item){
                return "active";
            }
            else {
                return "";
            }
        };


        $scope.$on("$locationChangeSuccess", function (evt, currentRoute){
            
            $scope.model.selectedItem = $location.path() || "";

        });

    }]
);