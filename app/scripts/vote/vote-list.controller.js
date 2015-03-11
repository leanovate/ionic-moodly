(function(angular) {
    'use strict';
    angular
        .module('Moodly.vote')
        .controller('VoteListCtrl', VoteListCtrl);

    function VoteListCtrl($scope, $ionicModal, VotingMgr, currentAuth) {
        var vl = this;

        vl.addByTan = addByTan;
        vl.closeAddByTan = closeAddByTan;
        vl.openAddByTan = openAddByTan;

        init();

        function init() {
            $ionicModal.fromTemplateUrl('scripts/vote/partials/add-voting-by-tan.html', {
                scope: $scope
            }).then(function(modal) {
                vl.modal = modal;
            });

            vl.newVotingTan = '';
            vl.votings = {};
            VotingMgr.votingsToParticipate(currentAuth.uid).$bindTo($scope, 'vl.votings');
        }


        function addByTan() {
            var voting = VotingMgr.getByTan(vl.newVotingTan);
            voting.$loaded().then(function() {
                if(voting) {
                    vl.votings[vl.newVotingTan] = {
                        title: voting.title,
                        owner: voting.owner
                    };
                }
            });
            vl.modal.hide();
        }

        function openAddByTan() {
            vl.modal.show();
        }

        function closeAddByTan() {
            vl.modal.hide();
        }
    }
})(angular);
