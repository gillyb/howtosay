app.directive('appHeader', function($location, $http, Dictionary) {
    return {
        restrict: 'E',
        templateUrl: 'app-header.html',
        transclude: true,
        link: function(scope, element, attrs) {
            Dictionary.then(function(dictionary) {
                $('#search-word').keyup(function() {
                    var query = $(this).val();
                    var filteredDictionary = $.grep(dictionary.Dictionary, function(word) {
                        return word.Plain.indexOf(query) == 0;
                    });
                    var filteredWords = filteredDictionary.map(function(word) {
                        return word.Voweled;
                    });
                    scope.Suggestions = filteredWords;
                    scope.$apply();
                });
            });
        }
    };
});