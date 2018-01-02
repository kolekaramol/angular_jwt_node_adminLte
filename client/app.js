angular.module( 'sample', [
  'sample.dashboard',
  'sample.login',
  'sample.signup',
  'angular-jwt',
  'angular-storage',
  'ui.bootstrap',
  'ngIdle'
])
.config(['$urlRouterProvider', 'jwtInterceptorProvider', '$httpProvider','KeepaliveProvider', 'IdleProvider','$stateProvider',function myAppConfig ($urlRouterProvider, jwtInterceptorProvider, $httpProvider,KeepaliveProvider, IdleProvider,$stateProvider) {
  $urlRouterProvider.otherwise('/login');
  var loginObj = {
                  templateUrl : "app/login/login.html",
                  url : "/login",
                   controller: 'LoginCtrl'};
  $stateProvider.state("login", loginObj);
  jwtInterceptorProvider.tokenGetter = function(store) {
    return store.get('jwt');
  }

  $httpProvider.interceptors.push('jwtInterceptor');

}])
.run(['$rootScope', '$state', 'store', 'jwtHelper','Idle',function($rootScope, $state, store, jwtHelper,Idle) {
  $rootScope.$on('$stateChangeStart', function(e, to) {
    if (to.data && to.data.requiresLogin) {
      if (!store.get('jwt') || jwtHelper.isTokenExpired(store.get('jwt'))) {
        e.preventDefault();
        $state.go('login');
      }
    }
  });

}])



.controller( 'AppCtrl',['$scope', '$location' , function AppCtrl ( $scope, $location ) {
  $scope.$on('$routeChangeSuccess', function(e, nextRoute){
    if ( nextRoute.$$route && angular.isDefined( nextRoute.$$route.pageTitle ) ) {
      $scope.pageTitle = nextRoute.$$route.pageTitle + ' | ODINVoiceCast' ;
    }
  });
}]);

