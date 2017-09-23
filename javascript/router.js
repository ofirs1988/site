/**
 * Created by ofir on 02/08/2017.
 */

app.config(['$stateProvider', '$urlRouterProvider','$authProvider', '$ocLazyLoadProvider', '$breadcrumbProvider',function($stateProvider, $urlRouterProvider,$authProvider, $ocLazyLoadProvider, $breadcrumbProvider) {

    $urlRouterProvider.otherwise('/');

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });
    var StateName;
    if(!window.location.href.includes('admin')){StateName = 'home.index';}else {StateName = 'app.admin';}
    $breadcrumbProvider.setOptions({
        prefixStateName: StateName,
        includeAbstract: true,
        template: '<li class="breadcrumb-item" ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a><span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span></li>'
    });

    // HOME STATES AND NESTED VIEWS ========================================

    $stateProvider
        .state('home', {
            abstract: true,
            templateUrl: 'template/common/layouts/full.html',
            //page title goes here
            controller: 'headerController',
            ncyBreadcrumb: {
                label: 'Root',
                skip: true
            },
            resolve: {
                loadCSS: ['$ocLazyLoad', function($ocLazyLoad) {
                    // you can lazy load CSS files
                    return $ocLazyLoad.load([{
                        serie: true,
                        name: 'Components css',
                        files: ['template/components/components.css']
                    },{
                        serie: true,
                        name: 'Site Css',
                        files: ['css/style.css']
                    }]);
                }],
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    // you can lazy load controllers
                    return $ocLazyLoad.load({
                        files: ['template/components/headerController.js']
                    });
                }]
            }
        })

        .state('home.index', {
            url: '/',
            templateUrl: 'template/home/home.html',
            controller:'homeController',
            //page title goes here
            ncyBreadcrumb: {
                label: 'Home',
            },
            //page subtitle goes here
            params: { subtitle: 'Welcome to ROOT powerfull Bootstrap & AngularJS UI Kit' }
        })

        .state('login', {
            url: '/login',
                    templateUrl: "template/authentication/login.html",
                    controller: 'loginController',
                    controllerAs: 'vm',
            ncyBreadcrumb: {
                label: 'Login',
            },
            resolve: {
                loadCSS: ['$ocLazyLoad', function($ocLazyLoad) {
                    // you can lazy load CSS files
                    return $ocLazyLoad.load([{
                        serie: true,
                        name: 'Authentication css',
                        files: ['template/authentication/authentication.css']
                    }]);
                }]
            },
            params: {
                obj: null
            }
        })

        .state('register', {
            url: '/register',
            templateUrl: "template/authentication/register.html",
            controller: 'registerController',
            controllerAs: 'vm',
            ncyBreadcrumb: {
                label: 'Register',
            },
            resolve: {
                loadCSS: ['$ocLazyLoad', function($ocLazyLoad) {
                    // you can lazy load CSS files
                    return $ocLazyLoad.load([{
                        serie: true,
                        name: 'Authentication css',
                        files: ['template/authentication/authentication.css']
                    }]);
                }]
            },
            params: {
                obj: null
            }
        })
    //
    //
    //     .state('profile', {
    //         url: '/profile',
    //         views: {
    //             'header': {
    //                 templateUrl: 'template/site/components/header.html',
    //                 controller: 'headerController'
    //             },
    //             'body': {
    //                 templateUrl: "template/site/user/profile.html",
    //                 controller: 'profileController',
    //                 controllerAs: 'vm'
    //             }
    //         },
    //     })
    //
    //     .state('settings', {
    //         url: '/settings',
    //         views: {
    //             'header': {
    //                 templateUrl: 'template/site/components/header.html',
    //                 controller: 'headerController'
    //             },
    //             'body': {
    //                 templateUrl: "template/site/user/settings.html",
    //                 controller: 'settingsController',
    //                 controllerAs: 'vm'
    //             }
    //         },
    //     })
    //
    //
    //     .state('home.feedback', {
    //         url: 'feedback',
    //         views: {
    //             'header': {
    //                 templateUrl: 'template/site/components/header.html',
    //                 controller: 'headerController'
    //             },
    //             'body': {
    //                 templateUrl: "template/site/user/feedback.html",
    //                 controller: 'feedbackController',
    //                 controllerAs: 'vm'
    //             }
    //         },
    //     })
    //
    //     .state('home.help', {
    //         url: 'help',
    //         views: {
    //             'header': {
    //                 templateUrl: 'template/site/components/header.html',
    //                 controller: 'headerController'
    //             },
    //             'body': {
    //                 templateUrl: "template/site/user/help.html",
    //                 controller: 'helpController',
    //                 controllerAs: 'vm'
    //             }
    //         },
    //     })
    //




}]);