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
            getByTan: getByTan,
            setVoting: setVoting,
            /**
             *
             * @param owner
             * @param tan
             * @param uid
             * @returns $firebaseObject
             */
            getVotingForTan: getVotingForTan
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
            var votesRef = new Firebase(FirebaseUrl + 'tan2Voting/' + tan.toUpperCase());
            return $firebaseObject(votesRef);
        }

        function votingsToParticipate(uid) {
            var votesRef = new Firebase(FirebaseUrl + 'votings2participate/' + uid);
            return $firebaseObject(votesRef);
        }

        function getVotingForTan(owner, tan, uid) {
            var votesRef = new Firebase(FirebaseUrl + 'votings/' + owner + '/' + tan.toUpperCase() + '/results/' + uid);
            return $firebaseObject(votesRef);
        }

        function setVoting(params) {
            var votesRef = new Firebase(
                FirebaseUrl + 'votings/' + params.owner + '/' + params.tan.toUpperCase() + '/results'
            );

            var d = new Date();
            votesRef.child(params.uid).push({value: params.mood, time: d.toString()});
        }
    }


})(angular, Firebase);
