(function () {
    'use strict';
    app.factory('AuthenticationService', AuthenticationService);
    AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', '$timeout','$q','httpService','jwtHelper'];
    function AuthenticationService($http, $cookies, $rootScope, $timeout,$q,httpService,jwtHelper) {
        var service = {};

        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;
        service.IsLogin = IsLogin;
        service.decodeUser = decodeUser;
        service.Create = Create;
        service.decodeJwt = decodeJwt;

        return service;

        function SetCredentials(token) {
            $rootScope.satellizer = {
                token: token
            };
            // console.log('SetCredentials: ' + user);
            // var authdata = Base64.encode(user.data.name + ';'
            //     + user.data.email + ';'
            //     + user.data.id + ';'
            //     + user.data.role_id + ';'
            //     + user.data.userinfo.ProfilePic
            // );

            // // set default auth header for http requests
            // $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
            // // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
            // var cookieExp = new Date();
            // cookieExp.setDate(cookieExp.getDate() + 7);
            // $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
            // if($rootScope.globals.currentUser.email == user.data.email){
            //     var result = { success:true, data: $rootScope.globals , massage: 'OK'};
            //     return result;
            // }
        }

        function ClearCredentials(callback) {
            if(localStorage.getItem('satellizer_token')){
                $rootScope.satellizer = {};
                localStorage.removeItem('satellizer_token');
                $http.defaults.headers.common.Authorization = 'Basic';
                if(!localStorage.getItem('satellizer_token')){
                    callback(true);
                }
            }
        }

        function decodeUser(data,callback){
            var userArray = Base64.decode(data.authdata).split(";");
            $timeout(function () {
                if(Array.isArray(userArray)){
                    var obj = {
                        'name' : userArray[0],
                        'email': userArray[1],
                        'role' : userArray[3],
                        'uid' : userArray[2],
                        'profilePic' : userArray[4]
                    };
                    callback(obj);
                }
            }, 1000);
        }

        function decodeJwt($token){
            if($token)
                return jwtHelper.decodeToken($token);
        }

        //Register

        function Create(user) {
            var deferred = $q.defer();
            // simulate api call with $timeout
            $timeout(function () {
                //Insert to db
                var newUser = CreateUserDb(user);
                $timeout(function(){
                    var response = newUser.$$state.value[0].data;
                    if(response.success || response.token){
                        user.id = response.data.id;
                        AuthenticationService.SetCredentials(response);
                        deferred.resolve({success: true});
                    }else{
                        var massage = response.massage;
                        deferred.resolve({success: false,massage: massage});
                    }
                }, 2000);
            }, 1000);
            return deferred.promise;
        }

        // private functions
        function CreateUserDb(user){
            if(user){
                var result;
                return httpService.httpPost('user/createUser',JSON.stringify(user)).then(function (result) {
                    return result;
                })
            }else
                result = { success: false ,massage: 'Undefined user' };
            return result;
        }
    }
;
})();