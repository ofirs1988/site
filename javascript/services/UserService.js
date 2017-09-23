/**
 * Created by ofir on 06/08/2017.
 */
(function () {
    'use strict';

    app.factory('UserService', UserService);

    UserService.$inject = ['$timeout', '$q','$state','AuthenticationService','httpService','jwtHelper'];
    function UserService($timeout,$q,$state,AuthenticationService,httpService,jwtHelper) {
        var service = {};

        service.setUser = setUser;
        service.activeUser = activeUser;
        service.deleteUser = deleteUser;
        //service.getInfoUser = getInfoUser;
        //service.isLogin = isLogin;
        service.decodeJwt = decodeJwt;
        //service.getUser = getUser;

        return service;

        function decodeJwt($token){
            if($token)
                return jwtHelper.decodeToken($token);
            else
                return false;
        }

        function setUser() {

        }

        function activeUser() {

        }

        function deleteUser() {

        }

        // function getInfoUser(id) {
        //     //return httpService.httpPost('user/userInfo',id);
        //     if(id){
        //         var result;
        //         return httpService.httpPost('user/userInfo',JSON.stringify(id)).then(function (result) {
        //             if(result[0].data.data.role.role_id || result[0].data.data.role.user_id){
        //                 setUser(result[0].data.data);
        //                 return result[1];
        //             }else
        //                 return 'error';
        //         })
        //     }else
        //         result = { success: false ,massage: 'Undefined user' };
        //     return result;
        // }

        // function setUser(user) {
        //     localStorage.setItem("user",JSON.stringify(user));
        // }
        //
        // function getUser() {
        //     return localStorage.getItem('user');
        // }

    }
})();