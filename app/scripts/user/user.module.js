(function(angular) {
    'use strict';
    angular
        .module('Moodly.user', ['firebase', 'ngCordova.plugins.device'])
        //.config(config)
    ;


    function config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app.user-create', {
                url: '/user/create',
                views: {
                    'menuContent': {
                        templateUrl: 'scripts/user/partials/user-create.html',
                        controller: 'CreateUserCtrl as cu'
                    }
                },
                resolve: {
                    // controller will not be loaded until $waitForAuth resolves
                    // Auth refers to our $firebaseAuth wrapper in the example above
                    'currentAuth': ['UserAuth', function(UserAuth) {
                        // $waitForAuth returns a promise so the resolve waits for it to complete
                        return UserAuth.auth().$waitForAuth();
                    }]
                }


            })

            .state('app.user-login', {
                url: '/user/login',
                views: {
                    'menuContent': {
                        templateUrl: 'scripts/user/partials/user-login.html',
                        controller: 'LoginUserCtrl as lu'
                    }
                },
                resolve: {
                    // controller will not be loaded until $waitForAuth resolves
                    // Auth refers to our $firebaseAuth wrapper in the example above
                    'currentAuth': ['UserAuth', function(UserAuth) {
                        // $waitForAuth returns a promise so the resolve waits for it to complete
                        return UserAuth.auth().$waitForAuth();
                    }]
                }
            });
    }


})(angular);
