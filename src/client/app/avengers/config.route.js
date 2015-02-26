/**
 * Created by Vasiliy on 2/18/2015.
 */
(function() {
    'use strict';

    angular
        .module('app.avengers')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/avengers',
                config: {
                    templateUrl: 'app/avengers/avengers.html',
                    controller: 'Avengers',
                    controllerAs: 'vm',
                    title: 'avengers',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Avengers'
                    },
                    data: {
                        requireLogin: true
                    }
                }
            }
        ];
    }

})();