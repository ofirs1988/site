(function () {
    'use strict';
    app.factory('AuthenticationService', AuthenticationService);
    AuthenticationService.$inject = ['$http','$rootScope','$timeout','$q','httpService','$auth'];
    function AuthenticationService($http, $rootScope, $timeout,$q,httpService,$auth) {
        var service = {};
        service.ClearCredentials = ClearCredentials;
        service.Create = Create;
        service.decodejj = decodejj;
        service.faceBookLogin = faceBookLogin;
        service.isAuthorized = isAuthorized;
        service.AuthUser = AuthUser;
        return service;

        //Login
        function AuthUser(credentials) {
            var deferred = $q.defer();
            return $auth.login(credentials).then(function(res){
                if(res.data.success){
                    setUserLocalStrorage(res.data.user);
                    deferred.resolve({success: true , data: res.data});
                }else {
                    deferred.resolve({success: false , error: res.data.massage});
                }
                return deferred.promise;
            });
        }

        function faceBookLogin(data) {
            return $auth.login(data).then(function(res){
                if(res.data.token) {
                    setUserLocalStrorage(res.data.user);
                    $rootScope.userLogin = true;
                    return true;
                }else{
                    $rootScope.userLogin = false;
                    return false
                }

            });
        }


        /* Check if user login */

        function isAuthorized() {
            var deferred = $q.defer();
            var clear = false;
            return httpService.httpPost('user/getUser',[]).then(function (res) {
                if(!res[0].data.success || !localStorage.getItem(Base64.encode('user'))){
                    ClearCredentials(function(response) {
                        if(response)
                            clear = true;
                    });
                }
                deferred.resolve({success: res[0].data.success,clear: clear});
                return deferred.promise;
            });
        }


        /* Log out user remove localstorage and header */

        function ClearCredentials(callback) {
            if(localStorage.getItem(Base64.encode('user')))
                localStorage.removeItem(Base64.encode('user'));
            if(localStorage.getItem('satellizer_token'))
                localStorage.removeItem('satellizer_token');

            $http.defaults.headers.common.Authorization = 'NOT Authorization';
            $rootScope.satellizer = {};
            $rootScope.saveUserSuccess = false;
            $rootScope.userLogin = false;
            if(!localStorage.getItem('satellizer_token') && !localStorage.getItem(Base64.encode('user'))){
                callback(true);
            }
        }

        //Register
        function Create(user){
            var deferred = $q.defer();
            // simulate api call with $timeout
            $timeout(function () {
                //Insert to db
                var newUser = CreateUserDb(user);
                $timeout(function(){
                    var response = newUser.$$state.value[0].data;
                    if(response.success || response.token){
                        user.id = response.data.id;
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


        function setUserLocalStrorage(user){
            if(user){
                if(!localStorage.getItem(Base64.decode('user'))){
                    localStorage.setItem(Base64.encode('user'),JSON.stringify(user));
                    return true;
                }
            }
            return false;
        }
    }

    function decodejj() {
       return  localStorage.getItem(Base64.encode('user'));
    }

    // Base64 encoding service used by AuthenticationService
    var Base64 = {
        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    this.keyStr.charAt(enc1) +
                    this.keyStr.charAt(enc2) +
                    this.keyStr.charAt(enc3) +
                    this.keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        }
    };
})();