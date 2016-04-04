angular.module("moviedb").filter("schoolrating",
    [function (){
        return function (rating, mode) {
            if (rating <= 10 && 9 <= rating){
                return (mode == "US")? "A": "SB";
            } else if (rating < 9 && 7 <= rating){
                return (mode == "US")? "B": "NT";
            } else if (rating < 7 && 6 <= rating){
                return (mode == "US")? "C": "BN";
            } else if (rating < 6 && 5 <= rating){
                return (mode == "US")? "D": "SF";
            } else if (rating < 5){
                return (mode == "US")? "E": "IN";
            }
        }
    }]
);