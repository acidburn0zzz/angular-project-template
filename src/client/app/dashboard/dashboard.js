/**
 * Created by Vasiliy on 2/17/2015.
 */

(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('Dashboard', Dashboard);

    Dashboard.$inject = [];

    function Dashboard() {

        /*jshint validthis: true */
        var vm = this;

        vm.test = 'Hello form dashboard';
    }

})();