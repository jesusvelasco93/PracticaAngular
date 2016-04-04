angular.module("moviedb").constant("paths", {
   home: "/",
   movies: "/movies",
   newMovie: "/movies/new",
   movieDetail: "/movies/:id", 
   series: "/series",
   serieDetail: "/series/:id", 
   people: "/people",
   notFound: "/404"
});