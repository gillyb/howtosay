
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
	});

	function selectRandomWord(dictionary) {
		var words = dictionary.Dictionary;
		var randomNumber = Math.floor(Math.random() * words.length);
		var randomWord = words[randomNumber];

		$scope.RandomWord = {};
		$scope.RandomWord.English = randomWord.Voweled;
		$scope.RandomWord.Hebrew = randomWord.Hebrew;

		_chosenWord = randomWord.Plain;
	}

});