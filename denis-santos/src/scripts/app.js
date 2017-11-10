angular.module('app', [
        'ngRoute', 'ngResource'
    ])
    .config(function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'src/views/main.html',
                controller: 'MainController',
                controllerAs: 'main'
            });
    })
	