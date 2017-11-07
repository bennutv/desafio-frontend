import 'font-awesome-webpack';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.scss';
import * as bennuList from './bennu.json';
import loader from './components/loader/loaderDirective';
import 'angular';

/**
 * Define app module
 */
angular.module('bennuApp', []);

/**
 * Main application controller
 */
angular.module('bennuApp')
  .controller('MainCtrl', ['$scope', '$http', '$timeout', ($scope, $http, $timeout) => {

    $scope.list = bennuList.data;
    $scope.limit = 4;
    $scope.limitIncrement = 2;

    $scope.isLoading = false;

    $scope.$on('getMorePosts', () => {
      if (!$scope.isLoading && $scope.limit < bennuList.data.length) {
        $scope.isLoading = true;
        $scope.$digest();
        $timeout(() => {
          $scope.limit += $scope.limitIncrement;
          $scope.isLoading = false;
        }, 2000);
      }
    });

  }]);



/**
 * Document scroll
 */
angular.module('bennuApp')
  .directive('body', ['$document', '$window', ($document, $window) => {
    return {
      restrict: 'E',
      link: ($scope, element, attrs) => {
        const header = document.querySelector('.top-header');

        // Apply shadow on header if user's scrolling down
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

        $document.on('mousewheel', (ev) => {
          // User's scrolling down and hasn't more content
          if (ev.wheelDeltaY < 0 &&
            element[0].scrollHeight <= $window.innerHeight ||
            element[0].scrollHeight == $window.innerHeight + $window.pageYOffset) {
            $scope.$broadcast('getMorePosts');
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
          if (angular.element(ev.target)
            .hasClass('active')) {
            return;
          }
          anchors.removeClass('active')
          angular.element(ev.target)
            .addClass('active');
          if (listWrap.scrollWidth > document.body.scrollWidth) {
            let index = ev.target.parentNode.getAttribute('data-index');
            if (index > 0) {
              let target = document.querySelector('nav li[data-index="' + (index - 1) + '"] a');
              let marginScroll = target.offsetLeft - 10;
              let lastValue = parseInt(window.getComputedStyle(listWrap, null)
                .getPropertyValue('margin-left'));
              listWrap.style.marginLeft = lastValue + (-1 * marginScroll) + 'px'
            }
          }
        });
      }
    }
  }]);

/**
 * Moving menu according to anchor position
 */
angular.module('bennuApp')
  .directive('loader', loader);