(function () {
    'use strict';
    app.factory('httpService', httpService);
    httpService.$inject = ['$http','$rootScope'];
    function httpService($http,$rootScope) {
        var data = [];
        var BaseServerUrl = $rootScope.apiUrl;

        var service = {};

        service.GetLocalStorage = GetLocalStorage;
        service.setLocalStorage = setLocalStorage;
        return service;


        function GetLocalStorage(key) {

        }


        function setLocalStorage(key,data) {

        }

    }
})();