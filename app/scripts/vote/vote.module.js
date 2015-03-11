(function(angular) {
    'use strict';
    angular
        .module('Moodly.vote', ['ng', 'firebase'])
        .config(config);

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app.votes', {
                url: '/votes',
                views: {
                    'menuContent': {
                        templateUrl: 'scripts/vote/partials/vote-list.html',
                        controller: 'VoteListCtrl as vl'
                    },
                    resolve: {
                        // controller will not be loaded until $waitForAuth resolves
                        // Auth refers to our $firebaseAuth wrapper in the example above
                        'currentAuth': ['UserAuth', function(UserAuth) {
                            // $waitForAuth returns a promise so the resolve waits for it to complete
                            return UserAuth.auth().$requireAuth();
                        }]
                    }
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
                        return UserAuth.auth().$requireAuth();
                    }]
                }
            })

            .state('app.votes.vote', {
                url: '/votes/:voteId',
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
                        return UserAuth.auth().$requireAuth();
                    }]
                }
            });

        $urlRouterProvider.otherwise('/app/votes/manage');
    }


})(angular);
