// Defino el módulo "moviedb"
angular.module("goldencrew", ['ngRoute', "ngSanitize"]).config(
    ["$routeProvider", function( $routeProvider){

        // Configuración de Route Provider
        $routeProvider.when("/", {
            templateUrl: 'views/login.html'
        }).when("/articles", {
            templateUrl: 'views/articles.html'
        }).otherwise({
            templateUrl: 'views/error.html'
        })
    }]
);