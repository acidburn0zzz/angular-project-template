(function() {
    'use strict';

    angular
        .module('app')
        .controller('TopNav', TopNav);

    function TopNav($scope, authService) {

        /*jshint validthis: true */
        var vm = this;

        $scope.$on('user-logged-changed', function(event, authUser) {
            vm.user = authUser;
        });

        vm.user = authService.getAuthUser()

        vm.logout = function() {
            authService.logout();
        }
    }
})();
