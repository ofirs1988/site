// Default colors
var app = angular.module('app', ['ui.router','oc.lazyLoad','ncy-angular-breadcrumb','environment','ngCookies',"ngSanitize","satellizer","angular-jwt","angular-loading-bar",
    "ngAnimate",
    "com.2fdevs.videogular",
    "com.2fdevs.videogular.plugins.controls",
    "com.2fdevs.videogular.plugins.overlayplay",
    "com.2fdevs.videogular.plugins.poster"])

.config(['envServiceProvider','$authProvider', function(envServiceProvider,$authProvider) {
    envServiceProvider.config({
        domains: {
            development: ['localhost', 'http://localhost:8000'],
            production: ['http://46.101.194.126', 'http://46.101.194.126/vmClient', 'http://46.101.194.126/vmClient/site'],
            test: ['test.acme.com', 'acme.dev.test', 'acme.*.com'],
        },
        vars: {
            development: {
                apiUrl: 'http://localhost:8000/api/',
                staticUrl: 'http://localhost:8000/api/',
                FacebookAppId: '173819226516915',
            },
            test: {
                apiUrl: 'http://127.0.0.1:8000/test',
                staticUrl: 'http://127.0.0.1:8000/test',
                FacebookAppId: '173819226516915',
            },
            production: {
                apiUrl: 'http://46.101.194.126/laravel/public/api/',
                staticUrl: 'http://46.101.194.126/laravel/public/api/',
                FacebookAppId: '494328654248437',
            },
            defaults: {
                apiUrl: '//api.default.com/v1',
                staticUrl: '//static.default.com'
            }
        }
    });
    envServiceProvider.check();

    $authProvider.loginUrl = envServiceProvider.read('apiUrl') + 'user/loginUser';



}])


.run(['$rootScope','envService','AuthenticationService', function($rootScope,envService,AuthenticationService) {
    console.log(envService.get());
    $rootScope.apiUrl = envService.read('apiUrl');
    AuthenticationService.isAuthorized().then(function (response){
        $rootScope.userLogin = response.success;
    });

    $rootScope.$on('$locationChangeSuccess',function(event){
        event.preventDefault();
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        console.log('$locationChangeSuccess');
    });



    window.fbAsyncInit = function() {
        FB.init({
            appId            : envService.read('FacebookAppId'),
            autoLogAppEvents : true,
            xfbml            : true,
            version          : 'v2.10'
        });
        FB.AppEvents.logPageView();
    };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}]);
