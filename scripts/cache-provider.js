
var htc = htc || {};

htc.Cache = {};
htc.CacheProvider = {
    Add: function(key, value) {
        htc.Cache[key] = value;
    },
    Get: function(key) {
        return htc.Cache[key];
    },
    Remove: function(key) {
        delete htc.Cache[key];
    }
};