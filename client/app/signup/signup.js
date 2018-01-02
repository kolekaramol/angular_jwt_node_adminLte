angular.module( 'sample.signup', [
  'ui.router',
  'angular-storage'
])
.config(function($stateProvider) {
  $stateProvider.state('signup', {
    url: '/signup',
    controller: 'SignupCtrl',
    templateUrl: 'signup/signup.html'
  });
})
.controller( 'SignupCtrl',[ '$scope', '$http', 'store', '$state',function SignupController( $scope, $http, store, $state) {

  $scope.user = {};

  $scope.createUser = function() {
    $http({
      url: 'http://localhost:3001/users',
      method: 'POST',
      data: $scope.user
    }).then(function(response) {
      store.set('jwt', response.data.id_token);
      $state.go('dashboard');
    }, function(error) {
      alert(error.data);
    });
  }

}]);
