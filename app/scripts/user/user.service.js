(function(angular, Firebase) {
    'use strict';
    angular.module('Moodly.user')
        .service('UserAuth', UserAuth);


    function UserAuth($firebaseAuth, FirebaseUrl, $q, $ionicLoading, $state) {
        var currentUserEmail = false;
        var currentUid = false;

        this.login = function(email, password) {
            return auth().$authWithPassword({
                email: email,
                password: password
            });
        };

        this.createUser = function(email, password) {
            return auth().$createUser({
                email: email,
                password: password
            });
        };

        this.setCurrentUser = function(uid) {
            currentUid = uid;
        };

        this.auth = auth;

        this.checkAuth = function() {
            $ionicLoading.show({
                content: 'Loading..',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            var deferred = $q.defer();
            var authData = auth().$getAuth();
            $ionicLoading.hide();
            if(authData) {
                currentUid = authData.uid;
                deferred.resolve(currentUid);
            } else {
                $state.go('app.user-login');
            }

            return deferred.promise;
        };

        function auth() {
            var fbAuth = false;
            if(!fbAuth) {
                var ref = new Firebase(FirebaseUrl);
                fbAuth = $firebaseAuth(ref);
            }

            return fbAuth;
        }
    }
})(angular, Firebase);
