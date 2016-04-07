angular.module("goldencrew").service("APIClientArticles", 
    ["$http", "$q", "apiPaths", function ($http, $q, apiPaths) {

        this.apiRequest = function(url){

            // crear el objeto diferido
            var deferred = $q.defer();

            //hacer el trabajo asíncrono
            $http.get(url).then(
                // peticion OK
                function(response){
                    //resolver la promesa
                    deferred.resolve(response.data);
                },
                // peticion KO
                function(response){
                    //rechazar la promesa
                    deferred.reject(response.data);
                }
            );
            //devolver la promesa
            return deferred.promise;
        };

        this.getArticles = function() {
            return this.apiRequest(apiPaths.articles);
        };

        this.createArticle = function (article) {
            var deferred = $q.defer();
            //movie.owner = LogUser.getLogin();
            $http.post(apiPaths.articles, article).then(

                function (response) {
                    console.log("Data", response.data);
                    deferred.resolve(response.data);
                },
                function (response) {
                    deferred.reject(response.data);
                }
            );
            return deferred.promise;
        };
    }]
);