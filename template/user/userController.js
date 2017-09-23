/**
 * Created by ofir on 02/08/2017.
 */
(function () {
    'use strict';
    app.controller('profileController', profileController);
    profileController.$inject = ['$state','$scope','$auth','AuthenticationService'];
    function profileController($state,$scope,$auth,AuthenticationService){
    }
})();


(function () {
    'use strict';
    app.controller('settingsController', settingsController);
    settingsController.$inject = ['AuthenticationService','FlashService','$scope','$state','$stateParams','$auth'];
    function settingsController(AuthenticationService,FlashService,$scope,$state,$stateParams,$auth) {

    }
})();

(function () {
    'use strict';
    app.controller('feedbackController', feedbackController);
    feedbackController.$inject = ['AuthenticationService','FlashService','$scope','$state','$stateParams','$auth'];
    function feedbackController(AuthenticationService,FlashService,$scope,$state,$stateParams,$auth) {

    }
})();

(function () {
    'use strict';
    app.controller('helpController', helpController);
    helpController.$inject = ['AuthenticationService','FlashService','$scope','$state','$stateParams','$auth'];
    function helpController(AuthenticationService,FlashService,$scope,$state,$stateParams,$auth) {
    }
})();