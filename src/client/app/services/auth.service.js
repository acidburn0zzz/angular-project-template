
(function() {
    'use strict';

    angular
        .module('app')
        .service('authService', authService);

    function authService($location, $rootScope, $window) {

        var authUser = $window.localStorage.getItem('user');

        var service = {
            login: login,
            logout: logout,
            getAuthUser: getAuthUser
        };

        return service;
        ////////////////////

        function login(username, password) {
            authUser = null;
            if (username==='test' && password==='test') {
                authUser = {
                    username: 'test'
                };
                $window.localStorage.setItem('user', authUser);
                $rootScope.$broadcast('user-logged-changed', authUser);
            }
            return authUser;
        }

        function logout() {
            authUser = null;
            $window.localStorage.setItem('user', authUser);
            $rootScope.$broadcast('user-logged-changed', authUser);
            $location.path('/');
        }

        function getAuthUser() {
            return authUser;
        }
    }
}());
