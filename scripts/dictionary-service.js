
var dictionaryService = angular.module('DictionaryService', []);

dictionaryService.factory('Dictionary', ['$http', '$q', 'CacheProvider', function ($http, $q, CacheProvider) {
    var dictionaryKey = "__Dictionary__";
    var dictionary = CacheProvider.get(dictionaryKey);
    if (!dictionary) {
        var d = $q.defer();
        $http.get('dictionary.js').then(function (response) {
            // TODO: I think we should cache this in localStorage
            CacheProvider.put(dictionaryKey, response.data);
            d.resolve(response.data);
        });
        return d.promise;
    } else {
        return $q.defer().resolve(dictionary);
    }
}]);