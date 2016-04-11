// En el módulo moviedb, defino el controlador
angular.module("goldencrew").controller("MenuController", 
    ["$scope", "$location", "$window", "APIClientUsers", "LogUser", "paths", function($scope, $location, $window, APIClientUsers, LogUser, paths) {


    // Scope init
    $scope.model = {
        selectedItem: paths.articles,
        user: "",
        pass: ""

    };
    $scope.paths = paths;

    // Scope methods


    $scope.getClassForItem = function(item) {
        if ($scope.model.selectedItem == item) {
            return "active";
        } else {
            return "";
        }
    };

    $scope.login = function() {
        APIClientUsers.getUser($scope.model.user, $scope.model.pass).then(

            function(data) {
                var logUser = data.usuario || "";
                if(logUser !== ""){
                    LogUser.setLogin(data.usuario, data.pass);
                    $scope.model.user = LogUser.getLogin();
                    $scope.model.pass = "";
                    if($location.path() == paths.login){
                        $location.url(paths.home);
                    }
                    else{
                        $window.location.reload();
                    }
                }
                else{
                    $location.url(paths.login);
                    LogUser.setErrorLogin(data.err);
                    $scope.$emit("loginErrorEmit", data.err);
                }
            },

            // película rechazada
            function(error) {
                $location.url(paths.error);
            }
        );
    };

    $scope.logout = function(){
        LogUser.setLogin("", "");
        $location.url(paths.home);
        $scope.model.user = "";
    };

    $scope.isloged = function() {
        return LogUser.isLogin();
    };

    $scope.refresh = function() {
        $scope.model.user = LogUser.getLogin();
        $scope.model.selectedItem = $location.path() || "";
    };

    // $scope.$on("$outTimeLogin", function(evt) {
    //     console.log("BROADCAAAAST!")
    //     $scope.logout();
    // });

    $scope.$on("$locationChangeSuccess", function(evt, currentRoute) {
        if (LogUser.isLogin()){
            $scope.model.user = LogUser.getLogin();
            $scope.model.pass = "";
        }
        $scope.model.selectedItem = $location.path() || ""; 
        if (LogUser.isLogin() && $location.path() == paths.login) {
            $location.url(paths.home);
        }
    });
    // $scope.model.user = LogUser.getLogin();
    $scope.refresh();
}]);
