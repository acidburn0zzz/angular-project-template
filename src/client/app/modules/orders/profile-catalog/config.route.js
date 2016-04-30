
(function() {
    'use strict';

    angular
        .module('app.orders')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/orders/profile-catalog',
                config: {
                    templateUrl: 'app/modules/orders/profile-catalog/profile-catalog.html',
                    controller: 'OrdersProfileCatalog',
                    controllerAs: 'vm',
                    title: 'OrdersProfileCatalog',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Avengers'
                    }
                }
            }
        ];
    }

})();