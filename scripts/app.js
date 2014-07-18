
var app = angular.module('howToSayApp', ['ngRoute', 'ngSanitize', 'ngAnimate', 'ngTouch', 'DictionaryService', 'FavoritesService']);

app.factory('CacheProvider', function ($cacheFactory) {
    // we can add a cache limit here if we'll need to
    return $cacheFactory('HowToSayCache');
});

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: 'HomeController'
        });
}]);

app.filter('unsafe', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
});
