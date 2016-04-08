// En el módulo moviedb, defino el controlador
angular.module("goldencrew").controller("ArticleDetailController", 
    ["$scope", "$location", "$routeParams", "LogUser", "APIClientArticles", "paths", function ($scope, $location, $routeParams, LogUser, APIClientArticles, paths){


        // Scope init
        $scope.model = {};

        $scope.userlog = LogUser.getLogin().toLowerCase();
        // Scope methods
        APIClientArticles.getArticle($routeParams.id).then(

            // película encontrada
            function(article){
                // console.log
                var err = article.err || "";
                if (err === ""){
                    $scope.model = article;
                    console.log("DATO", article);
                }
                else{
                    console.log("No encontrado");
                    $location.path(paths.error);
                } 
            },

            // película rechazada
            function(error){
                console.log("ERROR", error);
            }
        );
    }]
);