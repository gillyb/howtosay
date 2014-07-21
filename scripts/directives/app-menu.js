
app.directive('appMenu', function($location, $http) {
    return {
        restrict: 'E',
        templateUrl: 'app-menu.html',
        transclude: true,
        link: function(scope, element, attrs) {
        	scope.openFavorites = function() {
				$location.url('/favorites');
        	};
        }
    };
});