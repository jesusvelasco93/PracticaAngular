// En el módulo moviedb, defino el controlador
angular.module("goldencrew").controller("MenuController", 
    ["$scope", "$location", "APIClientUsers", "LogUser", "paths", function($scope, $location, APIClientUsers, LogUser, paths) {


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
    // var a = "crifradodelbueno";
    // var passa = sha(a);
    // console.log(passa);

    $scope.login = function() {
        APIClientUsers.getUser($scope.model.user, $scope.model.pass).then(

            // película encontrada
            function(data) {
                var logUser = data.usuario || "";
                if(logUser !== ""){
                    LogUser.setLogin($scope.model.user, $scope.model.pass);
                    $scope.model.pass = "";
                    if($location.path() == paths.login){
                        $location.url(paths.home);
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
       $scope.model.user = LogUser.getLogin();
       $scope.model.selectedItem = $location.path() || ""; 
        if (LogUser.isLogin() && $location.path() == paths.login) {
            $location.url(paths.home);
        }
    });

    $scope.refresh();
}]);
