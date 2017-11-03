import 'font-awesome-webpack';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.scss';
import * as bennuList from './bennu.json';
import 'angular';

/**
 * Define app module
 */
angular.module('bennuApp', []);

/**
 * Main application controller
 */
angular.module('bennuApp')
    .controller('MainCtrl', ['$scope', '$http', ($scope, $http) => {
        $scope.list = bennuList.data;
        $scope.limit = 10;
	}]);

/**
 * Document scroll
 */
angular.module('bennuApp')
    .directive('body', ['$document', ($document) => {
        return {
            restrict: 'E',
            link: ($scope, element, attrs) => {
                const header = document.querySelector('.top-header');

                $document.on('scroll', () => {
                    if (element[0].scrollTop > 0) {
                        angular.element(header)
                            .addClass('shadow');
                    }
                    else {
                        angular.element(header)
                            .removeClass('shadow');
                    }
                })
            }
        }
	}]);

/**
 * Moving menu according to anchor position
 */
angular.module('bennuApp')
    .directive('nav', ['$window', ($window) => {
        return {
            restrict: 'E',
            link: ($scope, element, attrs) => {

                const listWrap = document.querySelector('nav ul');
                const anchors = angular.element(document.querySelectorAll('nav ul a'));

                let lastMargin = 0;

                anchors.on('click', (ev) => {
                    ev.preventDefault();
                    if(angular.element(ev.target).hasClass('active')) {
                    	return;
                    }
                    anchors.removeClass('active')
                    angular.element(ev.target).addClass('active');
                    if (listWrap.scrollWidth > document.body.scrollWidth) {
	                    let index = ev.target.parentNode.getAttribute('data-index');
	                	if(index > 0) {
	                		let target = document.querySelector('nav li[data-index="'+ (index-1) +'"] a');
		                    let marginScroll = target.offsetLeft - 10;
	                        let lastValue = parseInt(window.getComputedStyle(listWrap, null).getPropertyValue('margin-left'));
	                        listWrap.style.marginLeft = lastValue + (-1 * marginScroll) + 'px'
	                	}
                    }
                });


            }
        }
	}]);