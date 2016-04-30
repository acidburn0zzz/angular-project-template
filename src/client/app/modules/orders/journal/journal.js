(function() {
    'use strict';

    angular
        .module('app.orders')
        .controller('OrdersJournal', OrdersJournal);

    function OrdersJournal(logger) {

        /*jshint validthis: true */
        var vm = this;

        vm.path = 'orders/journal';
        //////////////////////////////////////

        activate();

        function activate() {
            logger.info(vm.path + 'loaded');
        }
    }

})();
