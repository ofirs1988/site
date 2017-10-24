/**
 * Created by ofir on 02/08/2017.
 */




(function () {
    'use strict';
   app.controller('loginController', loginController);
    loginController.$inject = ['$state','$scope','AuthenticationService','FlashService','$rootScope'];
    function loginController($state,$scope,AuthenticationService,FlashService,$rootScope){
        var vm = this;
        $scope.parentData = 'Success';
        vm.login = login;
        vm.FBLogin = FBLogin;
        function login() {
            vm.dataLoading = true;
            AuthenticationService.AuthUser(vm.user).then(function (response) {
                if(!response.success){
                    $scope.$errors = response.error;
                    $rootScope.userLogin = response.success;
                }else {
                    $rootScope.userLogin = response.success;
                    $state.go('home.index');
                }
            });
            vm.dataLoading = false;
        };

        function FBLogin() {
            FB.login(function(response) {
                if (response.authResponse) {
                    FB.api('/me', { locale:
                        'en_EN',
                        fields: 'name,email,birthday,hometown,education,gender,website,work'},function(result){
                        if(result.id){
                            result.social = 'facebook';
                            if(result.email){
                                AuthenticationService.faceBookLogin(result).then(function (res) {
                                    $rootScope.userLogin = response.success;
                                    $state.go('home.index', {});
                                });
                            }else{
                                $scope.$apply(function() {
                                    $state.go('register',{obj:response});
                                });
                            }
                        }
                    });
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            },{scope: 'user_likes,email'});
        }
    }
})();


(function () {
    'use strict';
    app.controller('registerController', registerController);
    registerController.$inject = ['AuthenticationService','FlashService','$scope','$state','$stateParams','$auth'];
    function registerController(AuthenticationService,FlashService,$scope,$state,$stateParams,$auth) {

        var vm = this;
        vm.register = register;
        vm.FBLoginr = FBLoginr;
        $('[data-toggle="tooltip"]').tooltip();
        if($stateParams.obj){
            vm.user = $stateParams.obj;
        }

        function FBLoginr() {
            FB.login(function(response) {
                if (response.authResponse) {
                    console.log('Welcome!  Fetching your information.... ');
                    FB.api('/me', { locale: 'en_EN', fields: 'name,email,birthday,hometown,education,gender,website,work'},function(result){
                        if(result.id){
                            result.social = 'facebook';
                            if(result.email){
                                $auth.login(result).then(function(res){
                                    if(res.data.token){
                                        // If login is successful, redirect to the users state
                                        $state.go('home.index', {});
                                        $rootScope.userLogin = response.success;
                                    }else
                                        console.log('error');
                                });
                            }else{
                                $scope.$apply(function() {
                                    $state.go('register',{obj:response});
                                });
                            }
                            vm.dataLoading = false;
                        }
                    });
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            },{scope: 'user_likes,email'});
        }
        vm.dataLoading = true;

        function register() {

            AuthenticationService.Create(vm.user).then(function (response){
                    if (response.success){
                        FlashService.Success('Registration successful', true);
                        $state.go('login', {status:2});
                    } else {
                        $scope.$errors = response.massage;
                        FlashService.Error(response.massage);
                    }
                vm.dataLoading = false;
            });
        }
    }
})();