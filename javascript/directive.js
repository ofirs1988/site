app.directive("appDirective",['UserService','$rootScope','$state','AuthenticationService', function(UserService,$rootScope,$state,AuthenticationService) {
    return {
        restrict: 'AE',
        scope: { show: '&' },
        link: function(scope, elem, attrs) {
            // var token;
            // $rootScope.$on('$locationChangeSuccess',function(event){
            //     event.preventDefault();
            //     $rootScope.userLogin = UserService.isLogin();
            //         if(!localStorage.getItem("satellizer_token") || !AuthenticationService.decodejj()){
            //             if($rootScope.userLogin || $rootScope.token){
            //                 token = UserService.decodeJwt($rootScope.token);
            //                 if(!token)
            //                     token = UserService.decodeJwt(localStorage.getItem("satellizer_token"));
            //                 if(localStorage.getItem("satellizer_token") && token && !AuthenticationService.decodejj()){
            //                     var setUser = UserService.getInfoUser({id: token.sub});
            //                     if(setUser.$$state){
            //                         console.log('user is saved');
            //                         if(!AuthenticationService.decodejj())
            //                             $rootScope.saveUserSuccess = true;
            //                     }
            //                 }
            //             }
            //         }
            // });
        }
    };
}]);
angular
    .module('app')
    .directive('a', preventClickDirective)
    .directive('a', bootstrapCollapseDirective)
    .directive('a', navigationDirective)
    .directive('button', layoutToggleDirective)
    .directive('a', layoutToggleDirective)
    .directive('button', collapseMenuTogglerDirective)
    .directive('div', bootstrapCarouselDirective)
    .directive('toggle', bootstrapTooltipsPopoversDirective)
    .directive('tab', bootstrapTabsDirective)
    .directive('button', cardCollapseDirective)

//Prevent click if href="#"
function preventClickDirective() {
    var directive = {
        restrict: 'E',
        link: link
    }
    return directive;

    function link(scope, element, attrs) {
        if (attrs.href === '#'){
            element.on('click', function(event){
                event.preventDefault();
            });
        }
    }
}

//Bootstrap Collapse
function bootstrapCollapseDirective() {
    var directive = {
        restrict: 'E',
        link: link
    }
    return directive;

    function link(scope, element, attrs) {
        if (attrs.toggle=='collapse'){
            element.attr('href','javascript;;').attr('data-target',attrs.href.replace('index.html',''));
        }
    }
}

/**
 * @desc Genesis main navigation - Siedebar menu
 * @example <li class="nav-item nav-dropdown"></li>
 */
function navigationDirective() {
    var directive = {
        restrict: 'E',
        link: link
    }
    return directive;

    function link(scope, element, attrs) {
        if(element.hasClass('nav-dropdown-toggle') && angular.element('body').width() > 782) {
            element.on('click', function(){
                if(!angular.element('body').hasClass('compact-nav')) {
                    element.parent().toggleClass('open').find('.open').removeClass('open');
                }
            });
        } else if (element.hasClass('nav-dropdown-toggle') && angular.element('body').width() < 783) {
            element.on('click', function(){
                element.parent().toggleClass('open').find('.open').removeClass('open');
            });
        }
    }
}

//Dynamic resize .sidebar-nav
sidebarNavDynamicResizeDirective.$inject = ['$window', '$timeout'];
function sidebarNavDynamicResizeDirective($window, $timeout) {
    var directive = {
        restrict: 'E',
        link: link
    }
    return directive;

    function link(scope, element, attrs) {

        if (element.hasClass('sidebar-nav') && angular.element('body').hasClass('fixed-nav')) {
            var bodyHeight = angular.element(window).height();
            scope.$watch(function(){
                var headerHeight = angular.element('header').outerHeight();

                if (angular.element('body').hasClass('sidebar-off-canvas')) {
                    element.css('height', bodyHeight);
                } else {
                    element.css('height', bodyHeight - headerHeight);
                }
            })

            angular.element($window).bind('resize', function(){
                var bodyHeight = angular.element(window).height();
                var headerHeight = angular.element('header').outerHeight();
                var sidebarHeaderHeight = angular.element('.sidebar-header').outerHeight();
                var sidebarFooterHeight = angular.element('.sidebar-footer').outerHeight();

                if (angular.element('body').hasClass('sidebar-off-canvas')) {
                    element.css('height', bodyHeight - sidebarHeaderHeight - sidebarFooterHeight);
                } else {
                    element.css('height', bodyHeight - headerHeight - sidebarHeaderHeight - sidebarFooterHeight);
                }
            });
        }
    }
}

//LayoutToggle
layoutToggleDirective.$inject = ['$interval'];
function layoutToggleDirective($interval) {
    var directive = {
        restrict: 'E',
        link: link
    }
    return directive;

    function link(scope, element, attrs) {
        element.on('click', function(){

            if (element.hasClass('sidebar-toggler')) {
                angular.element('body').toggleClass('sidebar-hidden');
            }

            if (element.hasClass('aside-menu-toggler')) {
                angular.element('body').toggleClass('aside-menu-hidden');
            }
        });
    }
}

//Collapse menu toggler
function collapseMenuTogglerDirective() {
    var directive = {
        restrict: 'E',
        link: link
    }
    return directive;

    function link(scope, element, attrs) {
        element.on('click', function(){
            if (element.hasClass('navbar-toggler') && !element.hasClass('layout-toggler')) {
                angular.element('body').toggleClass('sidebar-mobile-show')
            }
        })
    }
}

//Bootstrap Carousel
function bootstrapCarouselDirective() {
    var directive = {
        restrict: 'E',
        link: link
    }
    return directive;

    function link(scope, element, attrs) {
        if (attrs.ride=='carousel'){
            element.find('a').each(function(){
                $(this).attr('data-target',$(this).attr('href').replace('index.html','')).attr('href','javascript;;')
            });
        }
    }
}

//Bootstrap Tooltips & Popovers
function bootstrapTooltipsPopoversDirective() {
    var directive = {
        restrict: 'A',
        link: link
    }
    return directive;

    function link(scope, element, attrs) {
        if (attrs.toggle=='tooltip'){
            angular.element(element).tooltip();
        }
        if (attrs.toggle=='popover'){
            angular.element(element).popover();
        }
    }
}

//Bootstrap Tabs
function bootstrapTabsDirective() {
    var directive = {
        restrict: 'A',
        link: link
    }
    return directive;

    function link(scope, element, attrs) {
        element.click(function(e) {
            e.preventDefault();
            angular.element(element).tab('show');
        });
    }
}

//Card Collapse
function cardCollapseDirective() {
    var directive = {
        restrict: 'E',
        link: link
    }
    return directive;

    function link(scope, element, attrs) {
        if (attrs.toggle=='collapse' && element.parent().hasClass('card-actions')){

            if (element.parent().parent().parent().find('.card-block').hasClass('in')) {
                element.find('i').addClass('r180');
            }

            var id = 'collapse-' + Math.floor((Math.random() * 1000000000) + 1);
            element.attr('data-target','#'+id)
            element.parent().parent().parent().find('.card-block').attr('id',id);

            element.on('click', function(){
                element.find('i').toggleClass('r180');
            })
        }
    }
}


app.directive('facebookInvite',['UserService',function () {
  return {
      restrict: 'AE',
      template: '<button class="InvFb">Facebook Invite</button>',
      link:function (scope,elem,attrs) {
          //UserService.getFacebookFriends();
      }
  }
}]);

app.directive("bgBubblesDir", function() {
    return {
        template : "    <ul class=\"bg-bubbles\">\n" +
        "<li></li>\n" +
        "<li></li>\n" +
        "<li></li>\n" +
        "<li></li>\n" +
        "<li></li>\n" +
        "<li></li>\n" +
        "<li></li>\n" +
        "<li></li>\n" +
        "<li></li>\n" +
        "<li></li>\n" +
        "</ul>"
    };
});