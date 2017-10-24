(function () {
    'use strict';
    app.controller('headerController', headerController);
    headerController.$inject = ['AuthenticationService','$state','$scope','$rootScope'];
    function headerController(AuthenticationService,$state,$scope,$rootScope) {
        var vm = this;
       //angular.extend(vm, $controller('loginController', {$scope: $scope}));
        vm.login = login;
        vm.FBLogin = FBLogin;
        vm.showLogin = showLogin;

        function showLogin() {
            document.getElementById("myDropdown").classList.toggle("show");
        }


        function login() {
            //vm.dataLoading = true;
            AuthenticationService.AuthUser(vm.user).then(function (response) {
                $rootScope.userLogin = response.success;
                if(!response.success){
                    $scope.$errors = response.error;
                }else {
                    $state.go('home.index');
                }
            });
            //vm.dataLoading = false;
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
                                    $rootScope.userLogin = res;
                                    if (!$scope.$$phase){
                                    $scope.$apply(function() {
                                        $state.go('home.index', {});
                                    });
                                    }
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

        vm.logout = function () {
            AuthenticationService.ClearCredentials(function (response) {
                if(response){
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $state.go('login',{});
                        });
                    }, 1000);
                }
            });
        }
    }
})();



