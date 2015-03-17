(function(angular, Firebase) {
    'use strict';
// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
    angular.module('Moodly', [
        'ionic',
        'firebase',
        'config',
        'Moodly.user',
        'Moodly.vote'
    ])
        .run(run)

        .config(config)

        .constant('FirebaseUrl', 'https://moodly.firebaseio.com/')
    ;

    function run($rootScope, $ionicPlatform, $state) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }

            if(window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });

        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
            if (error === 'AUTH_REQUIRED') {

                $state.go('app.user-login');
            }
        });
    }


    function config($stateProvider) {
        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html'
            });
    }
})(angular, Firebase);


