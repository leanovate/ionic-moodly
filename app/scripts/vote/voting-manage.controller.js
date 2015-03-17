(function(angular) {
    'use strict';
    angular
        .module('Moodly.vote')
        .controller('VotingManageCtrl', VotingManageCtrl)
    ;

    function VotingManageCtrl($scope, $ionicModal, VotingMgr, currentAuth, Moods,  $cordovaVibration) {
        var vm = this;
        var tan2VotingMapper;
        vm.createVoting = createVoting;
        vm.closeModal = closeModal;
        vm.openCreateVoting = openCreateVoting;
        vm.showResults = showResults;
        vm.moods = Moods;

        init();


        function init() {
            vm.newVoting = {};
            vm.myVotings = {};
            vm.currentVoteShown = false;

            VotingMgr.votingFbObject(currentAuth.uid).$bindTo($scope, 'vm.myVotings');
            //vm.noVotings = angular.equals({}, vm.myVotings);
            tan2VotingMapper =VotingMgr.tan2VotingMapper();

            $ionicModal.fromTemplateUrl('scripts/vote/partials/vote-create.html', {
                scope: $scope
            }).then(function(modal) {
                vm.modal = modal;
            });

            $ionicModal.fromTemplateUrl('scripts/vote/partials/vote-results.html', {
                scope: $scope
            }).then(function(modal) {
                vm.resultModal = modal;
            });

            $scope.$on('$destroy', function() {
                vm.resultModal.remove();
                vm.modal.remove();
            });

            $scope.$watch('vm.myVotings', function(newVal) {
                if(!vm.currentVoteShown || !newVal[vm.currentVoteShown]) {
                    return;
                }

                updateResults();
            });
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
            tan2VotingMapper.child(tan).set({
                owner: currentAuth.uid,
                title: vm.newVoting.title
            });

            vm.newVoting.title = '';
            vm.noVotings = false;
            closeModal();
        }

        function closeModal() {
            vm.modal.hide();
            vm.resultModal.hide();
        }

        function showResults($event, tan) {
            vm.currentVoteShown = tan;
            updateResults();
            vm.resultModal.show($event);
            $cordovaVibration.vibrate();
        }

        function updateResults() {
            var results = vm.myVotings[vm.currentVoteShown].results;
            vm.results = angular.copy(vm.moods);
            angular.forEach(results, function(value, uid) {
                if(!vm.results[value].votes) {
                    vm.results[value].votes = 0;
                }

                vm.results[value].votes++;
            });
        }
    }


    function getVotingTan() {
        var keylist = 'ABCDEFGHIJKLMNOPQRSTUVWXY1234567890';
        var temp = '';

        for(var i = 0; i <= 6; i++) {
            temp += keylist.charAt(Math.floor(Math.random() * keylist.length));
        }

        return temp;
    }

})(angular);
