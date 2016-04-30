
(function() {
    'use strict';

    angular
        .module('app.user')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/user/login',
                config: {
                    templateUrl: 'app/modules/user/login/login.html',
                    controller: 'UserLogin',
                    controllerAs: 'vm',
                    title: 'user login',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Avengers'
                    }
                }
            }
        ];
    }

})();