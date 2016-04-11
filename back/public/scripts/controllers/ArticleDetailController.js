// En el módulo moviedb, defino el controlador
angular.module("goldencrew").controller("ArticleDetailController", 
    ["$scope", "$location", "$routeParams", "$sce", "LogUser", "APIClientArticles", "paths", function ($scope, $location, $routeParams, $sce, LogUser, APIClientArticles, paths) {


    // Scope init
    $scope.model = {};
    $scope.state = "blank";

    $scope.userlog = LogUser.getLogin().toLowerCase();
    // Scope methods
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    };

    $scope.getArticle = function() {
        $scope.state = "loading";
        APIClientArticles.getArticle($routeParams.id).then(

            // articulo encontrada
            function(data) {
                // console.log
                var err = data.err || "";
                if (err === "") {
                    if (data.articles.length == 0){
                        $scope.state = "blank";
                    }
                    else{
                        $scope.state = "ideal";
                    }
                    $scope.model = data;
                    console.log("DATO", data);
                } else {
                    console.log("No encontrado");
                    $location.path(paths.error);
                }
            },

            // articulo rechazada
            function(error) {
                console.log("ERROR", error);
                $location.path(paths.error);
            }
        );
    };
    $scope.getArticle();
}]);
