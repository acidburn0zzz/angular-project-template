(function() {
    'use strict';

    angular
        .module('app.auth')
        .controller('LoginDlg', LoginDlg);

    function LoginDlg($modalInstance, authService, $rootScope, AUTH_EVENTS) {

        var vm = this;
        vm.login = login;
        vm.cancel = cancel;

        //////////////////////////////////////////////////////

        function login(credentials) {

            authService.loginPost(credentials).then(
                function(user) {
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    $rootScope.currentUser == user;
                },
                function() {
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                });

            $modalInstance.close();
        };

        function cancel() {
            $modalInstance.dismiss('cancel');
        };
    }
})();