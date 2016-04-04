angular.module("moviedb").service("APIClient", 
    ["$http", "$q", "apiPaths", "URL", function ($http, $q, apiPaths, URL) {

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

        this.getMovies = function() {
            console.log(this.apiRequest(apiPaths.movies));
            return this.apiRequest(apiPaths.movies);

        };

        this.getMovie = function(movieID) {
            var url = URL.resolve(apiPaths.movieDetail, { id: movieID });
            return this.apiRequest(url);

        };
        this.getSeries = function() {

            return this.apiRequest(apiPaths.series);

        };

        this.getSerie = function(serieID) {
            var url = URL.resolve(apiPaths.serieDetail, { id: serieID });
            return this.apiRequest(url);

        };

        this.createMovie = function(movie) {
            // crear el objeto diferido
            var deferred = $q.defer();

            //hacer el trabajo asíncrono
            $http.post(apiPaths.movies, movie).then(
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
    }]
);