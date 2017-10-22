(function() {
    'use strict';

    angular
        .module('healthApp')
        .controller('CustomerDashboardController', CustomerDashboardController);

    CustomerDashboardController.$inject = ['Customer', '$state'];

    function CustomerDashboardController(Customer, $state) {

        var vm = this;
        vm.test = "Hello from the controller!";
        vm.customers = [];

        loadAll();

        function loadAll() {
            Customer.query(function(result) {
                vm.customers = result;
                vm.searchQuery = null;
            });
        }

        vm.gotoAddMeal = function(){
            $state.go('customer-add-meal');
        }
    }
})();
