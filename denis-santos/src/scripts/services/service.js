(function (){
	'use strict';
	angular.module('app')
		.service('ServiceAPI', ServiceAPI);
		
		ServiceAPI.$inject = ['$resource'];
		
		function ServiceAPI($resource){
			return $resource('../../../bennu.json');	
		}		
})();