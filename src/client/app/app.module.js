/**
 * Created by Vasiliy on 2/17/2015.
 */

(function() {
    'use strict';

    angular.module('app', [
        /*
         * Order is not important. Angular makes a
         * pass to register all of the modules listed
         * and then when app.dashboard tries to use app.data,
         * it's components are available.
         */

        /*
         * Everybody has access to these.
         * We could place these under every feature area,
         * but this is easier to maintain.
         */
        'app.core',
        /*
         * Feature areas
         */
        'app.dashboard',
        'app.layout',

        'app.user',
        'app.orders'
    ]);

    angular
        .module('app')
        .config(['$locationProvider',  appConfig]);

    function appConfig($locationProvider) {
        $locationProvider.html5Mode(true);
    }

    angular
        .module('app')
        .run(['$rootScope', '$location', 'authService',  appRun]);

    function appRun($rootScope, $location, authService) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            //event.preventDefault();
            var user = authService.getAuthUser();
            if (user === null) {
                $location.path('/user/login');
            }
        });
    }

})();