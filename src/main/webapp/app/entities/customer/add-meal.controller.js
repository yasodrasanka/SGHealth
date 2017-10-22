(function(){
    'use strict';

    angular
        .module("healthApp")
        .directive('fileModel', fileModel)
        .service('fileUpload', fileUpload)
        .controller("AddMealController", AddMealController);

    fileModel.$inject = ['$parse'];

    function fileModel($parse){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }

    fileUpload.$inject = ['$http'];

    function fileUpload($http){
        this.uploadFileToUrl = function(file, uploadUrl){
            var fd = new FormData();
            fd.append('file', file);

            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })

                .success(function(){
                })

                .error(function(){
                });
        }
    }


    AddMealController.$inject = ['$scope', 'Customer', '$http', 'fileUpload'];

    function AddMealController($scope, Customer, $http, fileUpload){
        var vm = this;

        vm.decode = function(){
            var file = $scope.myFile;

            console.log('file is ' );
            console.dir(file);

            var uploadUrl = "http://api.qrserver.com/v1/read-qr-code/";
            fileUpload.uploadFileToUrl(file, uploadUrl);
        };

        function getFileBuffer() {
            var deferred = $.Deferred();
            var reader = new FileReader();
            reader.onloadend = function (e) {
                deferred.resolve(e.target.result);
            };
            reader.onerror = function (e) {
                deferred.reject(e.target.error);
            };

            reader.readAsArrayBuffer($("#fileQr")[0].files[0]);
            return deferred.promise();
        }
    }
})();
