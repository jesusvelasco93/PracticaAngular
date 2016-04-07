angular.module("goldencrew").controller("ArticleNewController", ["$scope", "$location", "APIClientArticles", "LogUser", "paths", function($scope, $location, APIClientArticles, LogUser, paths) {

    // Model init
    $scope.model = {};
    $scope.err = "";

    // GUARDAR EN LA BASE DE DATOS
    $scope.saveArticle = function() {
        APIClientArticles.createArticle($scope.model).then(
            function(article) {
                $scope.err = article.err || "";
                if ($scope.err === "") {
                    $scope.model = {};
                    $scope.newArticleForm.$setPristine();
                    $scope.successMessage = "Movie sved! <a href=\"#articles/?id=" + article.id + "\">View new movie detail</a>";
                }
                else{
                    $scope.newArticleForm.title.$setPristine();
                    $scope.successMessage = "A error happend. " + $scope.err + " .Please select other title";
                }
                alert($scope.successMessage);
            },
            function(error) {
                console.log("ERROR AL GUARDAR PELICULA", error);
            }
        )
    }

    // $scope.editArticle = function() {
    //     APIClient.createMovie($scope.model).then(
    //         function(movie) {
    //             $scope.successMessage = "Movie sved! <a href=\"#movies/" + movie.id + "\">View new movie detail</a>";
    //             $scope.model = {};
    //             $scope.uploadForm.$setPristine();
    //             console.log("PELICULA GUARDADA", movie);
    //         },
    //         function(error) {
    //             console.log("ERROR AL GUARDAR PELICULA", error);
    //         }
    //     )
    // }
    $scope.haveError = function() {
        if ($scope.err == "") {
            return false;
        }
        else{
            return true;
        }
    };

    $scope.isloged = function() {
        if (!LogUser.isLogin()) {
            $scope.$emit("loginError", "Hay que estar logeado");
            $location.path(paths.login);
        }
    };
    $scope.isloged();
}]);
