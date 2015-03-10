(function(angular, Firebase, FirebaseSimpleLogin) {
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

        .config(config);

    function run($rootScope, $ionicPlatform, $firebaseAuth, $firebase, $window, $ionicLoading) {
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

            $rootScope.checkSession = checkSession;
            $rootScope.hide = hide;
            $rootScope.logout = logout;
            $rootScope.notify = notify;
            $rootScope.show = show;

            $rootScope.userEmail = null;
            $rootScope.baseUrl = 'https://moodly.firebaseio.com/';
            var authRef = new Firebase($rootScope.baseUrl);
            $rootScope.auth = $firebaseAuth(authRef);


            function checkSession() {
                var auth = new FirebaseSimpleLogin(authRef, function(error, user) {
                    if(error) {
                        // no action yet.. redirect to default route
                        $rootScope.userEmail = null;
                        $window.location.href = '#/app/auth/signin';
                    } else if(user) {
                        // user authenticated with Firebase
                        $rootScope.userEmail = user.email;
                        $window.location.href = ('#/app/votings');
                    } else {
                        // user is logged out
                        $rootScope.userEmail = null;
                        $window.location.href = '#/app/auth/signin';
                    }
                });
            }

            function logout() {
                $rootScope.auth.$logout();
                $rootScope.checkSession();
            }

            function show(text) {
                $rootScope.loading = $ionicLoading.show({
                    content: text ? text : 'Loading..',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
            }

            function notify(text) {
                $rootScope.show(text);
                $window.setTimeout(function() {
                    $rootScope.hide();
                }, 1999);
            }

            function hide() {
                $ionicLoading.hide();
            }

        });
    }


    function config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html'
            });


        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/user/login');
    }
})(angular, Firebase, FirebaseSimpleLogin);


