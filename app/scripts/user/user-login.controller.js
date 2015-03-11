(function(angular) {
    'use strict';
    angular
        .module('Moodly.user')
        .controller('LoginUserCtrl', LoginUserCtrl);

    function LoginUserCtrl($rootScope, $state, UserAuth) {
        var lu = this;

        //if(UserAuth.getC)
        // check session
        lu.user = {
            email: '',
            password: ''
        };

        lu.validateUser = validateUser;
        lu.error = '';

        function validateUser() {

            var email = lu.user.email;
            var password = lu.user.password;

            UserAuth.login(email, password).then(function(user) {
                    UserAuth.setCurrentUser(user.uid);
                    lu.error = '';
                    $state.go('app.votes-manage');
                }).catch(function(error) {
                    lu.error = 'Invalid credentials';
                });
        }
    }

})(angular);
