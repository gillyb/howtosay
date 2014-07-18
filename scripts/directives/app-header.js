app.directive('appHeader', function($location, $http) {
    return {
        restrict: 'E',
        templateUrl: 'app-header.html',
        transclude: true,
        link: function(scope, element, attrs) {
            
        }
    };
});