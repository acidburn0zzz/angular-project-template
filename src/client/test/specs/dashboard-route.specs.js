/**
 * Created by Vasiliy on 2/18/2015.
 */

/* jshint -W117, -W030 */
describe('dashboard', function () {
    describe('route', function () {

        beforeEach(function() {
            module('app', specHelper.fakeLogger);
            specHelper.injector(function($httpBackend, $location, $rootScope, $route) {});
            $httpBackend.expectGET('app/dashboard/dashboard.html').respond(200);
        });

        it('should map / route to dashboard View template', function () {
            expect($route.routes['/'].templateUrl).
                toEqual('app/dashboard/dashboard.html');
        });

        it('should route / to the dashboard View', function () {
            $location.path('/');
            $rootScope.$digest();
            expect($route.current.templateUrl).toEqual('app/dashboard/dashboard.html');
        });

        it('should route /invalid to the otherwise (dashboard) route', function () {
            $location.path('/invalid');
            $rootScope.$digest();
            expect($route.current.templateUrl).toEqual('app/dashboard/dashboard.html');
        });
    });
});