// En el módulo moviedb, defino el controlador
angular.module("goldencrew").controller("ArticlesController", 
    ["$scope", "$location", "APIClientArticles", "LogUser", "paths", function ($scope, $location, APIClientArticles, LogUser, paths) {


        // Scope init
        $scope.model = {};
        $scope.paths = paths;
        $scope.userlog = LogUser.getLogin().toLowerCase();
        $scope.state = "blank";
        $scope.pages = [];
        $scope.pageSelect = 1;

        var limit = 3;
        // var numPags = 0;

        $scope.getClassForPage = function(page) {
            if ($scope.pageSelect == page) {
                return "active";
            } else {
                return "";
            }
        };

        $scope.getClassForItem = function(simbolo) {
            if ($scope.pageSelect == 1 && simbolo == "prev"){
                return "disabled";
            }
            else if ($scope.pageSelect == $scope.pages.length && simbolo == "next"){
                return "disabled";
            }
        };


        $scope.getPages = function() {
            $scope.state = "loading";
            APIClientArticles.getPages().then(

                // articulos encontrada
                function(data) {
                    $scope.state = "ideal";
                    numPags = data.numElem / limit;

                    for (i = 0; i < numPags; i++) {
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
            $scope.pageSelect = pag;
            APIClientArticles.getArticles(pag - 1, limit).then(

                // articulos encontrada
                function(data) {
                    if (data.articles.length == 0) {
                        $scope.state = "blank";
                    } else {
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

        // $scope.deleteArticle = function(id) {


        //     $scope.state = "loading";
        //     APIClientArticles.deleteArticle(id).then(

        //         // articulos encontrada
        //         function(data) {
        //             $scope.state = "ideal";
        //             console.log("DATO", data);
        //         },

        //         // articulos rechazada
        //         function(error) {
        //             console.log("ERROR", error);
        //             $location.path(paths.error);
        //         }

        //     );
        // };

        $scope.getArticles(1);
        $scope.getPages();

    }]
);
