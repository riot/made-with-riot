var GoogleAnalytics = (function(){

    function GoogleAnalytics() {
        this.UA = 'UA-000001';
    }

    GoogleAnalytics.prototype.message = function(text) {
        return this.UA;
    }

    return GoogleAnalytics;

})();
