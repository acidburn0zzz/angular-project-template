
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
                url: '/orders/journal',
                config: {
                    templateUrl: 'app/modules/orders/journal/journal.html',
                    controller: 'OrdersJournal',
                    controllerAs: 'vm',
                    title: 'OrdersJournal',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Avengers'
                    }
                }
            }
        ];
    }

})();