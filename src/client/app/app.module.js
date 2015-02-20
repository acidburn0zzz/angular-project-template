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
        'app.avengers',
        'app.layout'
    ]);

})();