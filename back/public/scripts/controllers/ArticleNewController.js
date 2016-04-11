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
                    $scope.message = "Article saved! Go to Articles.";
                    $scope.successMessage = "Article saved! <a href=#/\"" + paths.articles + "\">Go to Articles.</a>";
                }
                else{
                    $scope.newArticleForm.title.$setPristine();
                    $scope.message = "An error happend. " + $scope.err;
                }
                alert($scope.message);
            },
            function(error) {
                console.log("ERROR AL GUARDAR PELICULA", error);
                $location.path(paths.error);
            }
        )
    };

    $scope.haveError = function() {
        if ($scope.err == "") {
            return false;
        }
        else{
            return true;
        }
    };

    $scope.isloged = function() {
        var err = "Must to be loged";
        if (!LogUser.isLogin()) {
            LogUser.setErrorLogin(err);
            $location.path(paths.login);
        }
    };
    $scope.isloged();
}]);
