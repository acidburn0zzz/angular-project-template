/**
 * Created by Vasiliy on 2/18/2015.
 */


(function() {
    'use strict';

    angular
        .module('app.avengers')
        .controller('Avengers', Avengers);

    Avengers.$inject = [];

    function Avengers() {

        /*jshint validthis: true */
        var vm = this;

        vm.test = 'Hello form Avengers!';
    }

})();