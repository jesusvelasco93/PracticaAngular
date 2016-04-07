// En el módulo moviedb, defino el controlador
angular.module("goldencrew").controller("LoginController", 
    ["$scope", "$location", "APIClientUsers", "LogUser", "paths", function($scope, $location, APIClientUsers, LogUser, paths) {


    // Scope init
    $scope.model = {
        showError: ""
    };

    // Scope methods

    $scope.login = function() {
        APIClientUsers.getUser($scope.model.username, $scope.model.userpass).then(

            // respuesta
            function(data) {
                var logUser = data.usuario || "";
                if(logUser !== ""){
                    LogUser.setLogin($scope.model.username, $scope.model.userpass);
                    $scope.model.userpass = "";
                    if($location.path() == paths.login){
                        $location.url(paths.home);
                    }
                }
                else{
                    $scope.model.userpass = "";
                    $scope.loginForm.userpass.$setPristine();
                    $scope.showError(data.err);
                }
            },

            // error
            function(error) {
                $location.url(paths.error);
            }
        );
    };

    $scope.showError = function(err){
        console.log(err);
        $scope.errorMessage = "An error happend. " + err;
    };

    $scope.$on("loginError", function(evt, err) {
        console.log("capturado!");
        $scope.showError(err);
    });
    console.log("terminado de cargar");
}]);