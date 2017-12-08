app.directive('sidebarElement', function() {
	return {
		restrict: 'E',
		replace: true,
		controller: 'SidebarController',
		templateUrl: 'app/components/sidebar/sidebar.partial.html'
	}
});
