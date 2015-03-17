(function(angular) {
    'use strict';
    angular
        .module('Moodly.vote', ['ng', 'firebase', 'ngCordova.plugins.vibration'])
        .config(config)
        .value('Moods', [
            {img: '1-frustrated.png', label: 'frustrated'},
            {img: '2-sad.png', label: 'sad'},
            {img: '3-neutral.png', label: 'neutral'},
            {img: '4-fine.png', label: 'fine'},
            {img: '5-happy.png', label: 'happy'}
        ])
    ;

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app.votes-list', {
                url: '/votes',
                views: {
                    'menuContent': {
                        templateUrl: 'scripts/vote/partials/vote-list.html',
                        controller: 'VoteListCtrl as vl'
                    }
                },
                resolve: {
                    // controller will not be loaded until $waitForAuth resolves
                    // Auth refers to our $firebaseAuth wrapper in the example above
                    'currentAuth': ['UserAuth', function(UserAuth) {
                        // $waitForAuth returns a promise so the resolve waits for it to complete
                        return UserAuth.getUUID();
                    }]
                }
            })

            .state('app.votes-manage', {
                url: '/votes/manage',
                views: {
                    'menuContent': {
                        templateUrl: 'scripts/vote/partials/manage-votings.html',
                        controller: 'VotingManageCtrl as vm'
                    }
                },
                resolve: {
                    // controller will not be loaded until $waitForAuth resolves
                    // Auth refers to our $firebaseAuth wrapper in the example above
                    'currentAuth': ['UserAuth', function(UserAuth) {
                        // $waitForAuth returns a promise so the resolve waits for it to complete
                        return UserAuth.getUUID();
                    }]
                }
            })

            .state('app.vote', {
                url: '/votes/:tan',
                views: {
                    'menuContent': {
                        templateUrl: 'scripts/vote/partials/vote.html',
                        controller: 'VoteCtrl as vote'
                    }
                },
                resolve: {
                    // controller will not be loaded until $waitForAuth resolves
                    // Auth refers to our $firebaseAuth wrapper in the example above
                    'currentAuth': ['UserAuth', function(UserAuth) {
                        // $waitForAuth returns a promise so the resolve waits for it to complete
                        return UserAuth.getUUID();
                    }]
                }
            });

        $urlRouterProvider.otherwise('/app/votes/manage');
    }


})(angular);
