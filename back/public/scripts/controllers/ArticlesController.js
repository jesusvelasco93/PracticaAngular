// En el módulo moviedb, defino el controlador
angular.module("goldencrew").controller("ArticlesController", 
    ["$scope", "APIClientArticles", "paths", function ($scope, APIClientArticles, paths){


        // Scope init
        $scope.model = {};
        $scope.paths = paths;

        // Scope methods
        APIClientArticles.getArticles().then(

            // película encontrada
            function(articles){
                $scope.model = articles;
                console.log("DATO", articles);
            },

            // película rechazada
            function(error){
                console.log("ERROR", error);
            }

        );
    }]
);