/**
 * Created by Vasiliy on 2/17/2015.
 */

(function() {

    angular
        .module('app.dashboard')
        .controller('Dashboard', Dashboard);

    function Dashboard(logger) {

        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Главная страница';

        /////////////////////////////////////
        activate();

        function activate() {
            logger.info('Dashboard loaded');
        }
    }

})();