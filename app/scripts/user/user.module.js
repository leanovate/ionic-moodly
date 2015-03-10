(function(angular) {
    'use strict';
    angular
        .module('Moodly.user', ['firebase'])
        .config(config);


    function config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app.user-create', {
                url: '/user/create',
                views: {
                    'menuContent': {
                        templateUrl: 'scripts/user/partials/user-create.html',
                        controller: 'CreateUserCtrl as cu'
                    }
                }
            })
            .state('app.user-login', {
                url: '/user/login',
                views: {
                    'menuContent': {
                        templateUrl: 'scripts/user/partials/user-login.html',
                        controller: 'LoginUserCtrl as lu'
                    }
                }
            });
    }


})(angular);
