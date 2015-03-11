(function(angular) {
    'use strict';
    angular
        .module('Moodly.vote')
        .controller('VotingManageCtrl', VotingManageCtrl)
    ;

    function VotingManageCtrl($scope, $ionicModal, VotingMgr, currentAuth) {
        var vm = this;
        vm.createVoting = createVoting;
        vm.closeCreate = closeCreate;
        vm.openCreateVoting = openCreateVoting;

        init();


        function init() {
            $ionicModal.fromTemplateUrl('scripts/vote/partials/vote-create.html', {
                scope: $scope
            }).then(function(modal) {
                vm.modal = modal;
            });

            vm.newVoting = {};
            vm.myVotings = {};

            VotingMgr.votingFbObject(currentAuth.uid).$bindTo($scope, 'vm.myVotings');
            vm.noVotings = angular.equals({}, vm.myVotings);
        }

        function openCreateVoting() {
            vm.modal.show();
        }

        function createVoting() {
            var tan = getVotingTan();
            var voting = {
                'title': vm.newVoting.title,
                'owner': currentAuth.uid,
                'allowed': {},
                'results': {}
            };

            vm.myVotings[tan] = voting;
            vm.newVoting.title = '';
            vm.noVotings = false;
            closeCreate();
        }

        function closeCreate() {
            vm.modal.hide();
        }

        function getVotingTan() {
            var keylist = 'ABCDEFGHIJKLMNOPQRSTUVWXY1234567890';
            var temp = '';

            for(var i = 0; i <= 6; i++) {
                temp += keylist.charAt(Math.floor(Math.random() * keylist.length));
            }

            return temp;
        }
    }

})(angular);
