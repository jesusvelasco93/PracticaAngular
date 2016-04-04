angular.module("moviedb").filter("categories", 
    [function (){
        return function (array){
            if (typeof(array) === "undefined"){
                return;
            }
            else if (typeof(array) !== "object"){
                console.error("The param of categories´s filter cant be different to array");
                return;
            }
            else { 
                var text = "";
                for (var i in array){
                    if (i == 0){
                        text = array[i].toString();
                    }
                    else{
                        text = text + ", " + array[i].toString();
                    }
                }
                return text + ".";
            }
        }
    }]
);