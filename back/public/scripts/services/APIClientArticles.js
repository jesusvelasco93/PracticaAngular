angular.module("goldencrew").service("APIClientArticles", 
    ["$http", "$q", "LogUser", "apiPaths", function ($http, $q, LogUser, apiPaths) {

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

        // this.getArticles = function(numPag) {
        //     var url = apiPaths.articles + "/?pag=" + numPag;
        //     console.log(url);
        //     return this.apiRequest(url);
        // };

        this.getArticles = function(numPag, limit) {
            var url = apiPaths.articles + "/?pag=" + numPag  + "&limit=" + limit;
            console.log(url);
            return this.apiRequest(url);
        };

        this.getPages = function() {
            return this.apiRequest(apiPaths.articlesPages);
        };

        // this.deleteArticle = function (id) {
        //     var deferred = $q.defer();
        //     var idUser = { id : id };
        //     console.log(idUser);
        //     $http.delete(apiPaths.articles, idUser).then(

        //         function (response) {
        //             console.log("Data", response.data);
        //             deferred.resolve(response.data);
        //         },
        //         function (response) {
        //             deferred.reject(response.data);
        //         }
        //     );
        //     return deferred.promise;
        // };

        this.getArticle = function(id, limit){
            var url = apiPaths.articles + "/?id=" + id;
            console.log(url);
            return this.apiRequest(url);
        };

        this.createArticle = function (article) {
            var deferred = $q.defer();
            article.user_created = LogUser.getLogin();
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