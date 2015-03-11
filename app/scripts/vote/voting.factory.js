(function(angular, Firebase) {
    'use strict';
    angular
        .module('Moodly.vote')
        .factory('VotingMgr', VotingMgr)
    ;


    function VotingMgr($firebaseObject , FirebaseUrl) {

        return {
            votingFbObject: votingFbObject
        };

        function votingFbObject(uid) {
            var votesRef = new Firebase(FirebaseUrl + 'votings');
            return $firebaseObject(votesRef.orderByChild('owner').equalTo(uid));
        }
    }


})(angular, Firebase);
