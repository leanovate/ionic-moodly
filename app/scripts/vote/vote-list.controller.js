(function(angular) {
    'use strict';
    angular
        .module('Moodly.vote')
        .controller('VoteListCtrl', VoteListCtrl);

    function VoteListCtrl($scope, $ionicModal, VotingMgr, currentAuth, Moods, UserAuth) {
        var vl = this;

        vl.addByTan = addByTan;
        vl.closeAddByTan = closeAddByTan;
        vl.openAddByTan = openAddByTan;
        vl.moods = Moods;

        init();

        function init() {
            $ionicModal.fromTemplateUrl('scripts/vote/partials/add-voting-by-tan.html', {
                scope: $scope
            }).then(function(modal) {
                vl.modal = modal;
            });

            vl.newVotingTan = '';
            vl.votings = {};
            vl.votingResults = {};
            vl.uuId = UserAuth.getUUID().uid;

            var v2p = VotingMgr.votingsToParticipate(currentAuth.uid);

            v2p.$bindTo($scope, 'vl.votings');

            v2p.$loaded().then(function() {
                angular.forEach(v2p, function(vote, tan) {
                    addResultBind(tan);
                });
            });
        }


        function addByTan() {
            vl.newVotingTan = vl.newVotingTan.toUpperCase();
            var voting = VotingMgr.getByTan(vl.newVotingTan);
            voting.$loaded().then(function() {
                if(voting) {
                    vl.votings[vl.newVotingTan] = {
                        title: voting.title,
                        owner: voting.owner
                    };
                }
            });

            addResultBind(vl.newVotingTan);
            vl.modal.hide();
        }

        function openAddByTan() {
            vl.modal.show();
        }

        function closeAddByTan() {
            vl.modal.hide();
        }

        function addResultBind(tan) {
            if(!vl.votingResults[tan]) {
                vl.votingResults[tan] = VotingMgr.getVotingForTan(vl.votings[tan].owner, tan, currentAuth.uid);
                vl.votingResults[tan].$loaded(function() {
                    vl.votings[tan].result = vl.votingResults[tan].$value;
                });
                vl.votingResults[tan].$watch(function() {
                    vl.votings[tan].result = vl.votingResults[tan].$value;
                });

            }


        }
    }
})(angular);
