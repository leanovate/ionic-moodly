(function(angular) {
    'use strict';

    angular.module('Moodly.user').controller('CreateUserCtrl', CreateUserCtrl);

    function CreateUserCtrl($scope, $rootScope, $firebaseAuth, $window, $state) {
        var cu = this;
        cu.user = {
            email: '',
            password: ''
        };
        cu.createUser = function () {
            var email = cu.user.email;
            var password = cu.user.password;

            if (!email || !password) {
                $rootScope.notify('Please enter valid credentials');
                return false;
            }

            $rootScope.show('Please wait.. Registering');
            $rootScope.auth.$createUser(email, password, function (error, user) {
                if (!error) {
                    $rootScope.hide();
                    $rootScope.userEmail = user.email;
                    $state.go('app.votes.list');
                }
                else {
                    $rootScope.hide();
                    if (error.code === 'INVALID_EMAIL') {
                        $rootScope.notify('Invalid Email Address');
                    }
                    else if (error.code === 'EMAIL_TAKEN') {
                        $rootScope.notify('Email Address already taken');
                    }
                    else {
                        $rootScope.notify('Oops something went wrong. Please try again later');
                    }
                }
            });
        };
    }
})(angular);

