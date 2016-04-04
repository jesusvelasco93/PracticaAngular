angular.module("moviedb").value("apiPaths", {
   movies: "/api/movies",
   movieDetail: "/api/movies/:id",
   series: "/api/series",
   serieDetail: "/api/series/:id"
});