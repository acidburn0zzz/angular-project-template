(function() {
    'use strict';

    angular
        .module('app.avengers')
        .controller('Avengers', Avengers);

    function Avengers(logger) {

        /*jshint validthis: true */
        var vm = this;

        vm.test = 'Hello form Avengers!';

        //////////////////////////////////////

        activate();

        function activate() {
            logger.info('Avengers loaded');
        }
    }

})();