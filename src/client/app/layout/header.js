(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('Header', Header);

    function Header(authService) {
        /*jshint validthis: true */
        var vm = this;
        vm.login = login;

        ////////////////////////////

        activate();

        function activate() {
        }

        function login() {
            authService.loginDlg();
        }
    }
})();


