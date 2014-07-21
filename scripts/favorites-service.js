
var favoritesService = angular.module('FavoritesService', []);

favoritesService.factory('Favorites', ['CacheProvider', function () {

	var favoritesKey = "__FAVORITES__";

    var _save = function(favorites) {
        window.localStorage.setItem(favoritesKey, JSON.stringify(favorites));
    };

    var _get = function() {
        var favorites = window.localStorage.getItem(favoritesKey);
        
        if (!favorites)
            return {};

        return JSON.parse(favorites);
    };
    
    var _has = function(word) {
        var favorites = _get();
        return favorites.hasOwnProperty(word);
    };

    var _set = function(word) {
        var favorites = _get();
        if (favorites.hasOwnProperty(word))
            return;
        favorites[word] = true;
        _save(favorites);
    };

    var _remove = function(word) {
        var favorites = _get();
        if (!favorites.hasOwnProperty(word))
            return;
        delete favorites[word];
        _save(favorites);
    };

    return {
        get: _get,
        set: _set,
        has: _has,
        remove: _remove
    };

}]);