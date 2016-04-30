(function() {
    'use strict';

    angular
        .module('app.user')
        .controller('UserLogin', UserLogin);

    function UserLogin(logger, authService) {

        /*jshint validthis: true */
        var vm = this;

        vm.login = function (username, password) {
            var user = authService.login(username, password)
            if (user === null) {
                logger.error('Неправильные логин или пароль');
            }
        };

        //////////////////////////////////////

        activate();

        function activate() {
            logger.info('Login loaded');
        }
    }

})();
