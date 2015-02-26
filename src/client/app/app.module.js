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
        'app.auth',
        /*
         * Feature areas
         */
        'app.dashboard',
        'app.avengers',
        'app.layout',
        /*
        * 3d party
        * */
        'ui.bootstrap'
    ])
    .run(appRun);

    ///////////////////////////////////////////////////

    function appRun($rootScope) {

        $rootScope.$on('$routeChangeStart', function(event, next, current){

            var requireLogin = next.$$route.data.requireLogin;
            if (requireLogin) {
                alert('prevent');
                event.preventDefault();
            }

            //console.log('Changing from '+angular.toJson(current)+' to '+angular.toJson(next));
        });
        /*
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

            alert('$stateChangeStart');

            var requireLogin = toState.data.requireLogin;

            if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
                event.preventDefault();
                // get me a login modal!
            }
        });*/
    }
})();