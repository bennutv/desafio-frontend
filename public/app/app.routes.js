app.config(function($routeProvider, $locationProvider, $httpProvider) {

	$routeProvider

		.when('/', {
			redirectTo: '/app',
			replace: true,
			reloadOnSearch: false
		})

		.when('/app', {
			redirectTo: '/app/list',
			replace: true,
			reloadOnSearch: false
		})

    .when('/app/list', {
			templateUrl: 'app/views/list/list.view.html',
			controller: "ListController",
			replace: true,
			reloadOnSearch: false
		})

		// DEFAULT
		.otherwise({
			redirectTo: '/',
		});

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

});

app.config(['$httpProvider', function($httpProvider) {
	// checks for 401 responses to revoke login
  // $httpProvider.interceptors.push('AuthInterceptor');
  $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
}]);
