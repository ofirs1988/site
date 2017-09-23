(function () {
    'use strict';
    app.factory('httpService', httpService);
    httpService.$inject = ['$http','$rootScope','envService'];
    function httpService($http,$rootScope,envService) {
        var data = [];
        const BaseServerUrl = envService.read('apiUrl');

        var service = {};

        service.httpPost = httpPost;
        service.httpGet = httpGet;
        return service;



        function httpPost($url, $data) {
            return $http.post(BaseServerUrl + $url,$data)
                .then(function (response, status, headers, config) {
                    return data = [response,'success'];
                })
        }

        function httpGet($url, $data) {
            return $http.get(BaseServerUrl + $url, $data)
                .then(function (response, status, headers, config) {
                    return data = [response,'success'];
                })
        }

    }
})();