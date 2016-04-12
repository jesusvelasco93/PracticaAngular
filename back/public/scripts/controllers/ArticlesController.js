// En el módulo moviedb, defino el controlador
angular.module("goldencrew").controller("ArticlesController", 
    ["$scope", "$location", "APIClientArticles", "LogUser", "paths", function ($scope, $location, APIClientArticles, LogUser, paths) {


        // Scope init
        $scope.model = {};
        $scope.paths = paths;
        $scope.userlog = LogUser.getLogin().toLowerCase();
        $scope.state = "blank";
        $scope.pages = [];

        $scope.getPages = function() {
            $scope.state = "loading";
            APIClientArticles.getPages().then(

                // articulos encontrada
                function(data) {
                    $scope.state = "ideal"
                    var numPags = data.numElem;

                    console.log(data.numElem, numPags);
                    for (i=0; i<numPags; i++){
                        $scope.pages.push(i + 1);
                    }
                },

                // articulos rechazada
                function(error) {
                    console.log("ERROR", error);
                    $location.path(paths.error);
                }

            );
        };
        // Scope methods
        $scope.getArticles = function(pag) {
            $scope.state = "loading";
            APIClientArticles.getArticles(pag-1).then(

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
                    $location.path(paths.error);
                }

            );
        };

        $scope.getArticles(1);
        $scope.getPages();

    }]
);
