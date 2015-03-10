(function(angular) {
    'use strict';

    angular
        .module('Moodly.vote')
        .controller('VoteCtrl', VoteCtrl);

    function VoteCtrl($scope) {
        var v = this;
        v.slideHasChanged = slideHasChanged;
        v.moods = [
            {img: '1-frustrated.png', label: 'frustrated'},
            {img: '2-sad.png', label: 'sad'},
            {img: '3-neutral.png', label: 'neutral'},
            {img: '4-fine.png', label: 'fine'},
            {img: '5-happy.png', label: 'happy'}
        ];

        function slideHasChanged(idx) {
            console.log(idx);
        }
    }
})(angular);
