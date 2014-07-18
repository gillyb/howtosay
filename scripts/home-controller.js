
app.controller('HomeController', function($scope, $http, Dictionary, $location) {
	Dictionary.then(function(dictionary) {
		
		var words = dictionary.Dictionary;
		var randomNumber = Math.floor(Math.random() * words.length);
		var randomWord = words[randomNumber];

		$scope.RandomWord = {};
		$scope.RandomWord.English = randomWord.Voweled;
		$scope.RandomWord.Hebrew = randomWord.Hebrew;

	});

	$scope.refresh = function() {
		$location.reload();
	}

});