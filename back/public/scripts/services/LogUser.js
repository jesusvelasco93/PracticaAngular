angular.module("goldencrew").service("LogUser", ["$window", function ($window) {

    var errorLogin = "";

    this.setLogin = function(user, pass) {
        var username = user.charAt(0).toUpperCase() + user.slice(1);
        // Guardar el usuario en memoria del navegador
        window.localStorage.setItem("user", username);
        window.localStorage.setItem("pass", pass);
    };
    this.getLogin = function() {
        // var userLog = {
        //     user: window.localStorage.getItem("user"),
        //     // pass: window.localStorage.getItem("pass")
        // };
        // // Recuperamos el usuario guardado en el navegador
        // // console.log (window.localStorage.getItem("user"));
        // // return userLog;
        return window.localStorage.getItem("user") || "";
    };
    this.isLogin = function() {
        var user = window.localStorage.getItem("user") || "";
        if (user == "") {
            return false;
        } else {
            return true;
        }
    };
    this.setErrorLogin = function(err) {
        errorLogin = err;
    };
    this.getErrorLogin = function() {
        return errorLogin;
    };

}]);
