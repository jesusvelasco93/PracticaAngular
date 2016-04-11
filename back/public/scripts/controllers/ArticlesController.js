// En el módulo moviedb, defino el controlador
angular.module("goldencrew").controller("ArticlesController", 
    ["$scope", "APIClientArticles", "LogUser", "paths", function ($scope, APIClientArticles, LogUser, paths) {


        // Scope init
        $scope.model = {};
        $scope.paths = paths;
        $scope.userlog = LogUser.getLogin().toLowerCase();
        $scope.state = "blank";

        // Scope methods
        $scope.getArticles = function() {
            $scope.state = "loading";
            APIClientArticles.getArticles().then(

                // articulos encontrada
                function(data) {
                    if (data.articles.length == 0){
                        $scope.state = "blank";
                    }
                    else{
                        $scope.state = "ideal";
                    }
                    $scope.model = data;
                    $scope.$emit("endLoading");

                    console.log("DATO", data);
                },

                // articulos rechazada
                function(error) {
                    console.log("ERROR", error);
                    $location.url(paths.error);
                }

            );
        };

        $scope.getArticles();

    }]
);
