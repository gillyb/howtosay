
app.controller('FavoritesController', function($scope, $http, Dictionary, $location, Favorites) {

	Dictionary.then(function(dictionary) {
	
		$scope.Favorites = Object.keys(Favorites.get());

		$scope.selectWord = function(word) {
			var words = dictionary.Dictionary;
			var selectedWord;
			for (var i=0; i<words.length; i++) {
				if (words[i].Voweled == word) {
					selectedWord = words[i];
					break;
				}
			}

			displayWord(selectedWord);
			if ($('.definition .content').length)
				$('.definition .content').css('display','none');
		};

		$scope.showDefinition = function() {
			$('.definition .content').slideDown();
		};
	});

	$scope.refreshWord = function() {
		$location.url('/');
	};

	function displayWord(wordObj) {
		$scope.RandomWord = {};
		$scope.RandomWord.English = wordObj.Voweled;
		$scope.RandomWord.Hebrew = wordObj.Hebrew;
		$scope.Favorited = Favorites.has(wordObj.Plain);
		$scope.RandomWord.Definition = wordObj.Definition;

		_chosenWord = wordObj.Plain;
	}

});