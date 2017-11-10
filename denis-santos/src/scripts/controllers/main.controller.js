(function (){
	'use strict';
	angular.module('app')
		.controller('MainController', MainController);
		
		MainController.$inject = ['$scope', 'ServiceAPI'];
	
		function MainController($scope, ServiceAPI){
			$scope.carregaPosts = [];
			
			ServiceAPI.get(function(response){
				$scope.carregaPosts = response.data;
				for(var i = 0; i < $scope.carregaPosts.length; i++){
					$scope.carregaPosts[i].titulo;
					$scope.carregaPosts[i].descricao;
				}	
			});
			
			
		}
})();