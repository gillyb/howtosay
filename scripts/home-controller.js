
app.controller('HomeController', function($scope, $http, Dictionary, $location, Favorites) {

	var _chosenWord = '';

	Dictionary.then(function(dictionary) {
		selectRandomWord(dictionary);

		$scope.refreshWord = function() {
			selectRandomWord(dictionary);
		}

		$scope.toggleFavorite = function() {
			var starIcon = $('.favorite i');
			var favorited = starIcon.hasClass('glyphicon-star');
			if (!favorited) {
				starIcon.removeClass('glyphicon-star-empty').addClass('glyphicon-star');
				Favorites.set(_chosenWord);
			}
			else {
				starIcon.removeClass('glyphicon-star').addClass('glyphicon-star-empty');
				Favorites.remove(_chosenWord);
			}
		}

		$scope.selectWord = function(word) {
			var words = dictionary.Dictionary;
			var selectedWord;
			for (var i=0; i<words.length; i++) {
				if (words[i].Voweled == word) {
					selectedWord = words[i];
					break;
				}
			}

			$scope.RandomWord = {};
			$scope.RandomWord.English = selectedWord.Voweled;
			$scope.RandomWord.Hebrew = selectedWord.Hebrew;
			$scope.Favorited = Favorites.has(selectedWord.Plain);

			_chosenWord = selectedWord.Plain;
		};
	});

	function selectRandomWord(dictionary) {
		var words = dictionary.Dictionary;
		var randomNumber = Math.floor(Math.random() * words.length);
		var randomWord = words[randomNumber];

		$scope.RandomWord = {};
		$scope.RandomWord.English = randomWord.Voweled;
		$scope.RandomWord.Hebrew = randomWord.Hebrew;
		$scope.Favorited = Favorites.has(randomWord.Plain);

		_chosenWord = randomWord.Plain;
	}

});