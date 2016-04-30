
(function() {
    'use strict';

    angular
        .module('app')
        .factory('authService', authService);

    function authService($location) {
        var service = {
            login: login,
            logout: logout,
            getAuthUser: getAuthUser
        };

        return service;
        /////////////////////

        var authUser = null;

        function login(username, password) {
            if (username==='test' && password=='test') {
                authUser = {
                    username: 'test'
                }
            }
        }

        function logout() {
            authUser = null;
            $location.path('/');
        }

        function getAuthUser() {
            return authUser;
        }
    }
}());
