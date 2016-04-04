// Defino el módulo "moviedb"
angular.module("moviedb", ['ngRoute', "ngSanitize", "URL"]).config(
    ["$routeProvider", "paths", function( $routeProvider, paths){

        // Configuración de Route Provider
        $routeProvider.when("paths.home", {
            redirectTo: paths.movies
        }).otherwise({
            templateUrl: 'views/404.html'
        })
    }]
);