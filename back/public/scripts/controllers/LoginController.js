// En el módulo moviedb, defino el controlador
angular.module("goldencrew").controller("LoginController", 
    ["$scope", "$location", "APIClientUsers", "LogUser", "paths", function($scope, $location, APIClientUsers, LogUser, paths) {


    // Scope init
    $scope.model = {};
    $scope.err = "";
    $scope.state = "ideal";

    // Scope methods

    $scope.register = function() {
        $scope.state = "loading";
        var userNew = {
            name: $scope.model.newusername,
            pass: $scope.model.newuserpass,
            email: $scope.model.newuseremail
        }
        APIClientUsers.setUser(userNew).then(
            function(userCreated) {
                $scope.err = userCreated.err || "";
                if ($scope.err === "") {

                    $scope.model = {};
                    $scope.model.username = userNew.name;

                    $scope.showError("");

                    $scope.registerForm.$setPristine();
                    $scope.message = "User created! Go to Login.";
                }
                else{
                    $scope.registerForm.newusername.$setPristine();
                    $scope.message = "An error happend. " + $scope.err;
                }
                alert($scope.message);
                $scope.state = "ideal";
            },
            function(error) {
                console.log("ERROR AL CREAR EL USUARIO", error);
                $location.url(paths.error);
            }
        );
    };

    $scope.minLengthpass = function(){
        var passlength = $scope.model.newuserpass || "";
        if (passlength.length >= 6){
            return false;
        }
        else{
            if (passlength == ""){
                return false;
            }
            else{
                return true;
            }
        }
    };

    $scope.haveError = function() {
        if ($scope.err == "") {
            return false;
        }
        else{
            return true;
        }
    };

    $scope.login = function() {
        $scope.state = "loading";
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
                    $scope.loginForm.$setPristine();
                }
                $scope.state = "ideal";
            },

            // error
            function(error) {
                $location.url(paths.error);
            }
        );
    };


    $scope.showError = function(err){
        if (err !== ""){
            console.log(err);
            $scope.errorMessage = "An error happend. " + err;
        }
        else{
            LogUser.setErrorLogin("");
            $scope.errorMessage = "";
        }
    };
    $scope.$on("loginError", function (event, err) {
        $scope.showError(LogUser.getErrorLogin());
        $scope.loginForm.$setPristine();
    });            

    $scope.showError(LogUser.getErrorLogin());
    console.log("terminado de cargar");
}]);