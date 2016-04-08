// En el módulo moviedb, defino el controlador
angular.module("goldencrew").controller("ArticlesController", 
    ["$scope", "APIClientArticles", "LogUser", "paths", function ($scope, APIClientArticles, LogUser, paths){


        // Scope init
        $scope.model = {};
        $scope.paths = paths;
        $scope.userlog = LogUser.getLogin().toLowerCase();

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