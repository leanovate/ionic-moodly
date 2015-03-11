(function(angular) {
    'use strict';

    angular.module('Moodly.user').controller('CreateUserCtrl', CreateUserCtrl);

    function CreateUserCtrl(UserAuth, $state) {
        var cu = this;
        cu.user = {
            email: '',
            password: ''
        };
        cu.error = '';
        cu.createUser = createUser;



        function createUser() {
            var email = cu.user.email;
            var password = cu.user.password;

            if (!email || !password) {
                return false;
            }

            UserAuth.createUser(email, password)
                .then(function(userData) {
                    UserAuth.setCurrentUser(userData.uid);
                    cu.error = '';
                    $state.go('app.user-login');
                }).catch(function(error) {
                    cu.error = error;
                });
        }
    }
})(angular);

