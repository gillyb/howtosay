
app.controller('HomeController', function($scope, $http, Dictionary, $location, Favorites, $routeParams) {

	var _chosenWord = '';

	Dictionary.then(function(dictionary) {
		
		$scope.refreshWord = function() {
			selectRandomWord(dictionary);
			if ($('.definition .content').length)
				$('.definition .content').css('display','none');
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
				if (words[i].Voweled == word || words[i].Plain == word) {
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

		var selectedWord = $routeParams.w;
		if (selectedWord)
			$scope.selectWord(decodeURIComponent(selectedWord));
		else
			selectRandomWord(dictionary);
	});

	function displayWord(wordObj) {
		$scope.RandomWord = {};
		$scope.RandomWord.English = wordObj.Voweled;
		$scope.RandomWord.Hebrew = wordObj.Hebrew;
		$scope.Favorited = Favorites.has(wordObj.Plain);
		$scope.RandomWord.Definition = wordObj.Definition;

		_chosenWord = wordObj.Plain;
	}

	function selectRandomWord(dictionary) {
		var words = dictionary.Dictionary;
		var randomNumber = Math.floor(Math.random() * words.length);
		var randomWord = words[randomNumber];

		displayWord(randomWord);
	}

});