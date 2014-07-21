
app.controller('FavoritesController', function($scope, $http, Dictionary, $location, Favorites) {

	Dictionary.then(function(dictionary) {
	
		$scope.Favorites = Object.keys(Favorites.get());

		$scope.selectWord = function(word) {
			var url = '/?w=' + encodeURIComponent(word);
			$location.url(url);
		};
	});

	$scope.refreshWord = function() {
		$location.url('/');
	};

});