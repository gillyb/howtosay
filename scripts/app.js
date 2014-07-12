
var app = angular.module('howtosayApp', ['ngRoute', 'ngSanitize', 'ngAnimate', 'ngTouch']);

// classy.factory('CacheProvider', function ($cacheFactory) {
//     // we can add a cache limit here if we'll need to
//     return $cacheFactory('HomeLab_Mobile_Cache');
// });

classy.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: 'HomeController'
        });
}]);

classy.filter('unsafe', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
});
