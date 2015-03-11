(function(angular, Firebase) {
    'use strict';
    angular
        .module('Moodly.vote')
        .factory('VotingMgr', VotingMgr)
    ;


    function VotingMgr($firebaseObject, FirebaseUrl) {

        return {
            votingFbObject: votingFbObject,
            tan2VotingMapper: tan2VotingMapper,
            votingsToParticipate: votingsToParticipate,
            getByTan: getByTan
        };

        function votingFbObject(uid) {
            var votesRef = new Firebase(FirebaseUrl + 'votings/' + uid);
            return $firebaseObject(votesRef);
        }

        function tan2VotingMapper() {
            var votesRef = new Firebase(FirebaseUrl + 'tan2Voting');
            return votesRef;
        }

        function getByTan(tan) {
            var votesRef = new Firebase(FirebaseUrl + 'tan2Voting/' + tan);
            return $firebaseObject(votesRef);
        }

        function votingsToParticipate(uid) {
            var votesRef = new Firebase(FirebaseUrl + 'votings2participate/' + uid);
            return $firebaseObject(votesRef);
        }
    }


})(angular, Firebase);
