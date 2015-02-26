(function() {
    'use strict';

    angular.module('app.auth', ['ngMockE2E'])

        .run(appRun);

    function appRun($httpBackend) {

        $httpBackend.whenPOST('/login').respond(
            function(method, url, data) {
                var test = angular.fromJson(data);
                return [200, test, {}];
            });

        $httpBackend.whenGET(/.*/).passThrough();
        $httpBackend.whenPOST(/.*/).passThrough();
        $httpBackend.whenPUT(/.*/).passThrough();
        $httpBackend.whenDELETE(/.*/).passThrough();
    }
})();

