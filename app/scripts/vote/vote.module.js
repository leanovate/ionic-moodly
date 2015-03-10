(function(angular) {
    'use strict';
    angular
        .module('Moodly.vote', ['firebase'])
        .config(config);

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app.vote', {
                url: '/vote',
                views: {
                    'menuContent': {
                        templateUrl: 'scripts/vote/partials/vote.html',
                        controller: 'VoteCtrl as vote'
                    }
                }
            })

            .state('app.vote-list', {
                url: '/vote-list',
                views: {
                    'menuContent': {
                        templateUrl: 'scripts/vote/partials/vote.html',
                        controller: 'VoteCtrl as vote'
                    }
                }
            });
    }


})(angular);
