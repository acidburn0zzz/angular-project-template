(function() {
    'use strict';

    angular
        .module('app.auth')
        .factory('authService', authService);

    function authService($modal, $http, session) {
        var service = {
            loginDlg: loginDlg,
            loginPost: loginPost
        };
        return service;

        /////////////////////////////////////////////////////
        function loginDlg() {
            var modalInstance = $modal.open({
                templateUrl: 'app/auth/login.dlg.html',
                controller: 'LoginDlg',
                controllerAs: 'vm',
                size: 'sm'
            });

            modalInstance.result.then(function () {
            }, function () {
            });
        }

        function loginPost(credentials) {
            return $http
                .post('/login', credentials)
                .then(function (res) {
                    session.create(res.sessionId, res.userId, res.userRole);
                    return res;
                });
        }

        function isAuthenticated() {
            return !!session.userId;
        };

        function isAuthorized(authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (isAuthenticated() &&
            authorizedRoles.indexOf(session.userRole) !== -1);
        };
    }

})();