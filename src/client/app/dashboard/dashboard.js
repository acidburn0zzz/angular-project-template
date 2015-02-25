/**
 * Created by Vasiliy on 2/17/2015.
 */

(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('Dashboard', Dashboard);

    function Dashboard(logger) {

        /*jshint validthis: true */
        var vm = this;

        vm.test = 'Hello form dashboard';

        /////////////////////////////////////
        activate();

        function activate() {
            logger.info('Dashboard loaded');
        }
    }

})();