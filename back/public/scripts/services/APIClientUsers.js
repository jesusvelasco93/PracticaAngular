angular.module("goldencrew").service("APIClientUsers", ["$http", "$q", "apiPaths", function($http, $q, apiPaths) {

    this.apiRequest = function(url) {

        // crear el objeto diferido
        var deferred = $q.defer();

        //hacer el trabajo asíncrono
        $http.get(url).then(
            // peticion OK
            function(response) {
                //resolver la promesa
                deferred.resolve(response.data);
            },
            // peticion KO
            function(response) {
                //rechazar la promesa
                deferred.reject(response.data);
            }
        );
        //devolver la promesa
        return deferred.promise;
    };

    this.getAllUsers = function() {
        console.log(this.apiRequest(apiPaths.userAll));
        return this.apiRequest(apiPaths.userAll);

    };

    this.getUser = function(user, pass) {
        var deferred = $q.defer();
        var usuario = { name: user, pass: pass };
        $http.post(apiPaths.users, usuario).then(

            function(response) {
                deferred.resolve(response.data);
            },
            function(response) {
                deferred.reject(response.data);
            }
        );
        return deferred.promise;
    };

    this.setUser = function(user) {
        var deferred = $q.defer();
        $http.post(apiPaths.userNew, user).then(

            function(response) {
                console.log("Data", response.data);
                deferred.resolve(response.data);
            },
            function(response) {
                deferred.reject(response.data);
            }
        );
        return deferred.promise;
    };
}]);
