app.directive('headerElement', function() {
	return {
		restrict: 'E',
		replace: true,
		controller: 'HeaderController',
		templateUrl: 'app/components/header/header.partial.html'
	}
});
