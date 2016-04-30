(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('UserLogin', UserLogin);

    function UserLogin(logger) {

        /*jshint validthis: true */
        var vm = this;

        vm.test = 'Hello form Login!';

        //////////////////////////////////////

        activate();

        function activate() {
            logger.info('Login loaded');
        }
    }

})();
