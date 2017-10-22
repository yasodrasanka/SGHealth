(function(){
    'use strict';

    angular
        .module("healthApp")
        .controller("CaptureFoodController", CaptureFoodController);

    CaptureFoodController.$inject = ["Customer"];

    function CaptureFoodController(Customer){
        var vm = this;
        vm.test = "Hello from the controller!";

    }
})();
