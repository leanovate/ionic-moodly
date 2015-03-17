(function(angular) {
    'use strict';

    angular
        .module('Moodly.vote')
        .controller('VoteCtrl', VoteCtrl);

    function VoteCtrl(VotingMgr, $stateParams, currentAuth, Moods, $state) {
        var vote = this;

        vote.voteNow = voteNow;

        vote.moods = Moods;

        vote.selectedMood = 3;

        function voteNow() {
            var originalVote = VotingMgr.getByTan($stateParams.tan);
            originalVote.$loaded().then(function() {
                VotingMgr.setVoting({
                    owner: originalVote.owner,
                    tan: $stateParams.tan,
                    uid: currentAuth.uid,
                    mood: vote.selectedMood
                });
            });

            $state.go('app.votes-list');
        }
    }
})(angular);
