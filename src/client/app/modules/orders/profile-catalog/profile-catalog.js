(function() {
    'use strict';

    angular
        .module('app.orders')
        .controller('OrdersProfileCatalog', OrdersProfileCatalog);

    function OrdersProfileCatalog(logger) {

        /*jshint validthis: true */
        var vm = this;

        vm.path = 'orders/profile-catalog';
        //////////////////////////////////////

        activate();

        function activate() {
            logger.info(vm.path + 'loaded');
        }
    }

})();
