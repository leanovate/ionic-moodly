(function(angular) {
    'use strict';
    angular
        .module('Moodly.vote')
        .controller('VoteListCtrl', VoteListCtrl);

    function VoteListCtrl($scope, $ionicModal) {
        var vl = this;

        vl.addByTan = addByTan;
        vl.closeAddByTan = closeAddByTan;
        vl.openAddByTan = openAddByTan;

        init();

        function addByTan() {
            vl.modal.hide();
        }

        function openAddByTan() {
            vl.modal.show();
        }

        function closeAddByTan() {
            vl.modal.hide();
        }

        function init() {
            $ionicModal.fromTemplateUrl('scripts/vote/partials/add-voting-by-tan.html', {
                scope: $scope
            }).then(function(modal) {
                vl.modal = modal;
            });

            vl.votings = [];

        }


    }

})(angular);
