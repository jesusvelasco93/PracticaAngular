angular.module("moviedb").filter("ago", 
    [function (){
        return function (text){
            return moment(text).fromNow();
        };
    }]
);