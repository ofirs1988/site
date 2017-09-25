(function () {
    'use strict';
    app.controller('headerController', headerController);
    headerController.$inject = ['AuthenticationService','$state','$scope','$document'];
    function headerController(AuthenticationService,$state,$scope,$document) {
        var vm = this;

        vm.toggleNav = toggleNav;

        function toggleNav () {
            console.log(111);
            var menu = document.querySelector('.dropdown') // Using a class instead, see note below.
            menu.classList.toggle('open');
        }
        //vm.logout = logout;
        // if(typeof $rootScope.satellizer === 'string'){
        //     if($rootScope.satellizer){
        //         if(!localStorage.getItem('user')){
        //             UserService.infoUser($rootScope.satellizer).then(function(response){
        //                 console.log(response);
        //             });
        //         }else {
        //
        //         }
        //         // AuthenticationService.decodeUser($rootScope.satellizer, function (response) {
        //         //     if (typeof response === 'object') {
        //         //         console.log(response);
        //         //         // $scope.name = response.name;
        //         //         // $scope.email = response.email;
        //         //         // $scope.role = response.role;
        //         //     } else {
        //         //         //vm.dataLoading = false;
        //         //     }
        //         // });
        //     }
        // }
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



