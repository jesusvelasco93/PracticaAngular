// Defino el módulo "moviedb"
angular.module("goldencrew", ['ngRoute', "ngSanitize"]).config(
    ["$routeProvider", "paths", function ($routeProvider, paths){

        // Configuración de Route Provider
        $routeProvider.when(paths.login, {
            templateUrl: 'views/login.html'
        }).when(paths.articles, {
            templateUrl: 'views/articles.html'
        }).when(paths.articleNew, {
            templateUrl: 'views/articleNew.html'
        }).when(paths.articleDetail, {
            templateUrl: 'views/articleDetail.html'
        }).when(paths.home, {
            redirectTo: paths.articles
        }).otherwise({
            templateUrl: 'views/error.html'
        })

    }]
);